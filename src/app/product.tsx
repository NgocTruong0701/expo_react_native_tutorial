import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

const ProductDetailsScreen  = () => {
    const { id } = useLocalSearchParams();
    return (
        <Text>Hello {id}</Text>
    );
};

export default ProductDetailsScreen;