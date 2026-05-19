import { Box } from '@/components/ui/box';
import { Fab, FabIcon, FabLabel } from '@/components/ui/fab';
import { AddIcon } from '@/components/ui/icon';
import { Pressable } from './ui/pressable';

interface TapButtonProps {
    handleClick: () => void
}

export default function TapButton({ handleClick }: TapButtonProps) {
    return (
        <Fab
            size="sm"
            placement="bottom right"
            className="bg-green-500 active:bg-gray-500 mt-12 "
            onPress={handleClick}
        >
            <FabIcon className="text-white" as={AddIcon} />
            <FabLabel className="text-white">Add To Cart</FabLabel>
        </Fab>
    
  );
}