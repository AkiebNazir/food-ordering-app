
"use client";

import Image from "next/image";
import type { MenuItem, ItemVariant, ItemAddOn, SelectedVariantOption } from "../../lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { PlusCircle, Tag } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import React, { useState, useEffect, useMemo } from 'react';
import { useCart } from "../../context/CartContext";
import { useToast } from "../../hooks/use-toast";

type MenuItemCardProps = {
  item: MenuItem;
};

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const [selectedVariantOptionName, setSelectedVariantOptionName] = useState<string | undefined>(
    item.variants && item.variants.length > 0 && item.variants[0].options.length > 0
      ? item.variants[0].options[0].name
      : undefined
  );

  const [selectedAddOnsMap, setSelectedAddOnsMap] = useState<Record<string, boolean>>({});

  // Effect to initialize selectedVariantOptionName if item variants change or on mount
  useEffect(() => {
    if (item.variants && item.variants.length > 0 && item.variants[0].options.length > 0) {
      const defaultVariant = item.variants[0];
      if (defaultVariant.options.length > 0) {
         // Check if current selection is valid, if not, reset to default
        const currentVariantOptionExists = defaultVariant.options.some(opt => opt.name === selectedVariantOptionName);
        if (!selectedVariantOptionName || !currentVariantOptionExists) {
            setSelectedVariantOptionName(defaultVariant.options[0].name);
        }
      } else {
        setSelectedVariantOptionName(undefined);
      }
    } else {
      setSelectedVariantOptionName(undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.variants]); // Only re-run if item.variants themselves change

  const handleAddOnToggle = (addOnName: string) => {
    setSelectedAddOnsMap(prev => ({ ...prev, [addOnName]: !prev[addOnName] }));
  };

  const handleAddToCart = () => {
    let finalSelectedVariant: SelectedVariantOption | undefined = undefined;
    if (item.variants && item.variants.length > 0 && selectedVariantOptionName) {
      const variantType = item.variants[0]; // Assuming one variant type per item for simplicity in this card
      const chosenOption = variantType.options.find(opt => opt.name === selectedVariantOptionName);
      if (chosenOption) {
        finalSelectedVariant = {
          variantName: variantType.name,
          optionName: chosenOption.name,
          priceChange: chosenOption.priceChange || 0,
        };
      }
    }

    const finalSelectedAddOns: ItemAddOn[] = (item.addOns || [])
      .filter(addOn => selectedAddOnsMap[addOn.name])
      .map(addOn => ({ name: addOn.name, price: addOn.price }));
    
    addItem(item, 1, finalSelectedVariant, finalSelectedAddOns);
    toast({
      title: "Item Added",
      description: `${item.name} has been added to your order.`,
    });
  };
  
  const currentPrice = useMemo(() => {
    let price = item.price;
    if (item.variants && item.variants.length > 0 && selectedVariantOptionName) {
        const variantType = item.variants[0];
        const chosenOptionDetails = variantType.options.find(opt => opt.name === selectedVariantOptionName);
        if (chosenOptionDetails && chosenOptionDetails.priceChange) {
            price += chosenOptionDetails.priceChange;
        }
    }
    (item.addOns || []).forEach(addOn => {
        if (selectedAddOnsMap[addOn.name]) {
            price += addOn.price;
        }
    });
    return price;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, selectedVariantOptionName, selectedAddOnsMap]);


  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-[1.02] flex flex-col h-full group">
      <CardHeader className="p-0">
        <div className="relative h-40 w-full">
          <Image
            src={item.imageUrl || 'https://placehold.co/300x200.png'}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            data-ai-hint={item.dataAiHint || "food item"}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg mb-1">{item.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-2 min-h-[40px]">{item.description}</CardDescription>
        
        {item.variants && item.variants.map((variant, vIndex) => (
          <div key={vIndex} className="my-2">
            <Label className="text-xs font-medium text-muted-foreground">{variant.name}</Label>
            <Select 
              value={selectedVariantOptionName} 
              onValueChange={setSelectedVariantOptionName}
              defaultValue={variant.options.length > 0 ? variant.options[0].name : undefined}
            >
              <SelectTrigger className="w-full mt-1 h-9">
                <SelectValue placeholder={`Select ${variant.name}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {variant.options.map((option, oIndex) => (
                    <SelectItem key={oIndex} value={option.name}>
                      {option.name} {option.priceChange ? `(${option.priceChange > 0 ? '+' : ''}$${option.priceChange.toFixed(2)})` : ''}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        ))}

        {item.addOns && item.addOns.length > 0 && (
          <div className="my-3">
            <Label className="text-xs font-medium text-muted-foreground mb-1 block">Add-ons:</Label>
            <div className="space-y-1">
            {item.addOns.map((addOn, aIndex) => (
              <div key={aIndex} className="flex items-center space-x-2">
                <Checkbox 
                  id={`addon-${item.id}-${aIndex}`} 
                  checked={!!selectedAddOnsMap[addOn.name]}
                  onCheckedChange={() => handleAddOnToggle(addOn.name)}
                />
                <Label htmlFor={`addon-${item.id}-${aIndex}`} className="text-sm font-normal">
                  {addOn.name} (+ ${addOn.price.toFixed(2)})
                </Label>
              </div>
            ))}
            </div>
          </div>
        )}

      </CardContent>
      <CardFooter className="p-4 pt-2 border-t items-center justify-between">
        <p className="text-lg font-semibold text-primary flex items-center">
          <Tag className="h-4 w-4 mr-1" /> ${currentPrice.toFixed(2)}
        </p>
        <Button size="sm" onClick={handleAddToCart} className="transition-all duration-200 ease-in-out active:scale-[0.98] active:brightness-95">
          <PlusCircle className="mr-2 h-4 w-4" /> Add to Order
        </Button>
      </CardFooter>
    </Card>
  );
}
