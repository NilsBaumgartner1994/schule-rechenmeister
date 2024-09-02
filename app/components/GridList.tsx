import React, {FunctionComponent} from "react";
import {View, Text} from "@/components/Themed";

export type GridListProps = {
    amountColumns: number;
    paddingVertical?: number;
    paddingHorizontal?: number;
    children: any;
}

export const GridList: FunctionComponent<GridListProps> = (props) => {

    const {amountColumns, paddingVertical} = props;
    const children = props.children;
    const childrenArray = React.Children.toArray(children);
    const rows = [];
    let currentRow = [];
    for(let i = 0; i < childrenArray.length; i++){
        currentRow.push(childrenArray[i]);
        if(currentRow.length === amountColumns){
            rows.push(currentRow);
            currentRow = [];
        }
    }
    if(currentRow.length > 0){
        rows.push(currentRow);
    }
    return (
        <View style={{flexDirection: "column", flexWrap: "wrap", width: "100%", justifyContent: "center"
        }}>
            {rows.map((row, index) => {
                return (
                    <View key={index} style={{flexDirection: "row", flex: 1, width: "100%", justifyContent: "center", paddingVertical: paddingVertical || 0
                    }}>
                        {row.map((child, index) => {
                            return (
                                <View key={index} style={{flex: 1, paddingHorizontal: props.paddingHorizontal || 0}}>
                                    {child}
                                </View>
                            );
                        })}
                    </View>
                );
            })}
        </View>
    );

}
