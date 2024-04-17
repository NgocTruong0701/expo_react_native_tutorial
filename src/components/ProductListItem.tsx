import Colors from "@/constants/Colors";
import { Link, router } from "expo-router";
import { Image, StyleSheet, Text, Pressable } from "react-native"

export interface IProduct {
    id: number;
    image: string | null;
    name: string;
    price: number;
};

interface IProductProp {
    product: IProduct
}

export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/6cheese.png';

const ProductListItem = ({ product }: IProductProp) => {
    return (
        <Pressable style={styles.container} onPress={() => {
            router.push({
                pathname: "/product",
                params: {
                    id: product.id,
                },
            });
        }}>
            <Image
                source={{ uri: product.image || defaultPizzaImage }}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>
        </Pressable>

    )
}


export default ProductListItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        flex: 1,
        maxWidth: '50%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    price: {
        color: Colors.light.tint,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    }
});
