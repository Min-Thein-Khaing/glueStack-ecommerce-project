import { Box } from '@/components/ui/box';
import { Fab, FabIcon, FabLabel } from '@/components/ui/fab';
import { AddIcon } from '@/components/ui/icon';
import { Pressable } from './ui/pressable';

export default function TapButton() {
    return (
        <Fab
            size="sm"
            placement="bottom right"
            className="bg-green-500 active:bg-gray-500 mt-12 "
    
        >
            <FabIcon className="text-white" as={AddIcon} />
            <FabLabel className="text-white">Add To Cart</FabLabel>
        </Fab>
    
  );
}