import React from "react";
import { Text } from "./ui/text";
import { HStack } from "./ui/hstack";
import { Pressable } from "./ui/pressable";

type TitleProps = {
    title: string;
    btnTitle: string;
};

const Title = ({ title, btnTitle }: TitleProps) => {
    return (
        <HStack className="justify-between items-center px-4 mt-3 ">
            <Text className=" text-md font-[500] tracking-[1px] text-[#151111]">
                {title}
            </Text>
            <Pressable>
                <Text className="text-[10px] font-bold  text-[#0c072d] underline  tracking-[1px]">
                    {btnTitle}  
                </Text>
            </Pressable>
        </HStack>
    );
};

export default Title;