import React, { useState } from 'react';  
import { View, TextInput, StyleSheet, Text, Button, SafeAreaView, ImageBackground } from 'react-native';  
import { Picker } from '@react-native-picker/picker';  
import { useNavigation } from '@react-navigation/native';  
import { RootStackParamList } from './RootStackParams';  
import { StackNavigationProp } from '@react-navigation/stack';  

// Define the allowed values for course  
type Course = "Starter" | "Main" | "Dessert";  

type AddRecipeProp = StackNavigationProp<RootStackParamList, 'AddRecipe'>;  

export default function AddRecipeScreen() {  
    // State for Starter  
    const [starterDish, setStarterDish] = useState('Tomato Salad with Burrata and \'Nduja Sauce');  
    const [starterDescription, setStarterDescription] = useState('The fresh tomato has a crunchy and creamy indulgent burrata');  
    const [starterPrice, setStarterPrice] = useState('R300');  

    // State for Main  
    const [mainDish, setMainDish] = useState('Crab Cakes');  
    const [mainDescription, setMainDescription] = useState('Crispy on the outside, and sweet and tender on the inside. ');  
    const [mainPrice, setMainPrice] = useState('R500');  

    // State for Dessert  
    const [dessertDish, setDessertDish] = useState('tiramisu');  
    const [dessertDescription, setDessertDescription] = useState('A desert derived from Italy it has a brown topping with white creaminess inside ');  
    const [dessertPrice, setDessertPrice] = useState('R200');  

    const [course, setCourse] = useState<Course>('Starter'); // Default to "Starter"  
    const [error, setError] = useState(false);  

    const navigation = useNavigation<AddRecipeProp>();  

    const handleAddMenu = (currentMenu: Array<{ dish: string; description: string; price: string; course: Course }>) => {  
        let newMenu;  
        if (course === 'Starter') {  
            newMenu = { dish: starterDish, description: starterDescription, price: starterPrice, course };  
        } else if (course === 'Main') {  
            newMenu = { dish: mainDish, description: mainDescription, price: mainPrice, course };  
        } else {  
            newMenu = { dish: dessertDish, description: dessertDescription, price: dessertPrice, course };  
        }  
        const updatedMenu = [...currentMenu, newMenu];  
        navigation.navigate('Home', { menu: updatedMenu });  
    };  

    return (  
        <SafeAreaView style={styles.container}>  
            <View style={{ flex: 1 }}>  
                {/* Add Background to only this section */}  
                <ImageBackground  
                    source={require('../assets/Fancy_And_Delight.png')}  
                    style={styles.bg}  
                    resizeMode="cover" // Optional: scale the image properly  
                >  
                    <View style={styles.main2}>  
                        <Text style={styles.titleText2}>ADD MENU ITEM</Text>  
                    </View>  
                </ImageBackground>  

                {/* Form remains outside */}  
                <View style={styles.editForm}>  
                    <Text style={styles.label}>Dish Name</Text>  
                    <TextInput  
                        value={course === 'Starter' ? starterDish : course === 'Main' ? mainDish : dessertDish}  
                        onChangeText={newText => {  
                            if (course === 'Starter') setStarterDish(newText);  
                            else if (course === 'Main') setMainDish(newText);  
                            else setDessertDish(newText);  
                        }}  
                        style={styles.input}  
                    />  
                    <Text style={styles.label}>Description</Text>  
                    <TextInput  
                        value={course === 'Starter' ? starterDescription : course === 'Main' ? mainDescription : dessertDescription}  
                        onChangeText={newText => {  
                            if (course === 'Starter') setStarterDescription(newText);  
                            else if (course === 'Main') setMainDescription(newText);  
                            else setDessertDescription(newText);  
                        }}  
                        style={styles.input}  
                    />  
                    <Text style={styles.label}>Price</Text>  
                    <TextInput  
                        value={course === 'Starter' ? starterPrice : course === 'Main' ? mainPrice : dessertPrice}  
                        onChangeText={newText => {  
                            if (course === 'Starter') setStarterPrice(newText);  
                            else if (course === 'Main') setMainPrice(newText);  
                            else setDessertPrice(newText);  
                        }}  
                        style={styles.input}  
                    />  
                    <Text style={styles.label}>Course:</Text>  
                    <Picker  
                        selectedValue={course}  
                        onValueChange={(value: Course) => setCourse(value)}  
                        style={styles.picker}  
                    >  
                        <Picker.Item label="Starter" value="Starter" />  
                        <Picker.Item label="Main" value="Main" />  
                        <Picker.Item label="Dessert" value="Dessert" />  
                    </Picker>  
                    <Button  
                        title="Add Menu"  
                        onPress={() => {  
                            const currentMenu =  
                                navigation.getState().routes.find(r => r.name === 'Home')?.params?.menu || [];  
                            handleAddMenu(currentMenu);  
                            setError(false);  
                        }}  
                    />  
                    {error && <Text style={styles.errorText}>Please fill in all fields</Text>}  
                </View>  
            </View>  
        </SafeAreaView>  
    );  
}  

const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
        marginLeft: 5,  
    },  

    errorText: {  
        fontSize: 20,  
    },  

    bg: {  
        width: 20, // Fixed width  
        height: 200, // Fixed height  
        alignSelf: 'center', // Optional: Center horizontally  
    },  

    editForm: {  
        padding: 40,  
        backgroundColor: 'white',  
        marginTop: 20,  
        borderRadius: 20,  
        margin: 20,  
        height: 600,  
    },  

    input: {  
        height: 50,  
        borderColor: 'gray',  
        borderWidth: 1,  
        marginBottom: 35,  
        paddingLeft: 10,  
    },  

    label: {  
        fontSize: 20,  
        marginBottom: 8,  
    },  

    picker: {  
        height: 60,  
        width: 150,  
    },  

    main2: {  
        height: 70,  
        width: 350,  
        backgroundColor: 'white',  
        marginVertical: 10,  
        justifyContent: 'center',  
        alignItems: 'center',  
        borderRadius: 100,  
        marginLeft: 20,  
        borderWidth: 4,  
    },  

    titleText2: {  
        fontSize: 28,  
        fontWeight: 'bold',  
        textAlign: 'center',  
        marginVertical: 10,  
        color: 'black',  
    },  
});