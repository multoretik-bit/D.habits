import React from "react";
import { useApp, ShopItem } from "@/contexts/AppContext";

interface CharacterDisplayProps {
  width?: number;
  height?: number;
}

const CharacterDisplay: React.FC<CharacterDisplayProps> = ({ width = 150, height = 200 }) => {
  const { characterState, shopItems } = useApp();
  
  const renderItem = (item?: ShopItem) => {
    if (!item) return null;
    if (item.assetPath && item.assetPath.endsWith('.png')) {
      return (
        <image 
          href={item.assetPath} 
          x="0" y="0" width="100" height="150" 
          preserveAspectRatio="xMidYMid meet"
        />
      );
    }
    return <g dangerouslySetInnerHTML={{ __html: item.assetPath || "" }} />;
  };

  const equippedItems: { [key: string]: ShopItem } = {};
  Object.entries(characterState).forEach(([slot, itemId]) => {
    const item = shopItems.find((i) => i.id === itemId);
    if (item) equippedItems[slot] = item;
  });

  return (
    <div className="relative" style={{ width: `${width}px`, height: `${height}px` }}>
      <svg width={width} height={height} viewBox="0 0 100 150" style={{ position: "relative", display: "block" }}>
        {/* Background Layer */}
        {renderItem(equippedItems.background)}

        {/* Vehicle (behind character) */}
        {renderItem(equippedItems.vehicle)}

        {/* Base character */}
        <circle cx="50" cy="25" r="20" fill="#E0B98D" />
        <rect x="40" y="45" width="20" height="50" fill="#E0B98D" />
        <rect x="25" y="45" width="15" height="40" fill="#E0B98D" transform="rotate(-10 32.5 65)" />
        <rect x="60" y="45" width="15" height="40" fill="#E0B98D" transform="rotate(10 67.5 65)" />
        <rect x="40" y="95" width="15" height="50" fill="#E0B98D" />
        <rect x="45" y="95" width="15" height="50" fill="#E0B98D" />

        {/* Clothing Layers */}
        {renderItem(equippedItems.head)}
        {renderItem(equippedItems.body)}
        {renderItem(equippedItems.hands)}
        {renderItem(equippedItems.feet)}
        {renderItem(equippedItems.accessory)}

        {/* Pet Layer (beside character) */}
        {equippedItems.pet && (
           <g transform="translate(65, 100) scale(0.3)">
              {renderItem(equippedItems.pet)}
           </g>
        )}
      </svg>
    </div>
  );
};

export default CharacterDisplay;
