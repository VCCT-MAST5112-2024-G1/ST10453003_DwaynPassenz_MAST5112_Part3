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
    const [dish, setDish] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [course, setCourse] = useState<Course>('Starter'); // Default to "Starter"
    const [error, setError] = useState(false);

    const navigation = useNavigation<AddRecipeProp>();

    const handleAddMenu = (currentMenu: Array<{ dish: string; description: string; price: string; course: Course }>) => {
        const newMenu = { dish, description, price, course };
        const updatedMenu = [...currentMenu, newMenu];
        navigation.navigate('Home', { menu: updatedMenu });
    };

    return (
        <SafeAreaView style={styles.container}>
           <ImageBackground
    source={require('../assets/images/Fancy_And_Delight.png')} 
    style={styles.bg}
>
    {/* Child components go here */}
</ImageBackground>


                <View style={styles.main2}>
                    <Text style={styles.titleText2}>ADD MENU ITEM</Text>
                </View>

                <View style={styles.editForm}>
                    <Text style={styles.label}>Dish Name</Text>
                    <TextInput placeholder="dish" onChangeText={newText => setDish(newText)} style={styles.input} />

                    <Text style={styles.label}>Description</Text>
                    <TextInput placeholder="description" onChangeText={newText => setDescription(newText)} style={styles.input} />

                    <Text style={styles.label}>Price</Text>
                    <TextInput placeholder="price" onChangeText={newText => setPrice(newText)} style={styles.input} />

                    <Text style={styles.label}>Course:</Text>
                    <Picker selectedValue={course} onValueChange={(value: Course) => setCourse(value)} style={styles.picker}>
                        <Picker.Item label="Starter" value="Starter" />
                        <Picker.Item label="Main" value="Main" />
                        <Picker.Item label="Dessert" value="Dessert" />
                    </Picker>

                    <Button
                        title="Add Menu"
                        onPress={() => {
                            if (!isEmpty(dish) && !isEmpty(description) && !isEmpty(price) && !isEmpty(course)) {
                                const currentMenu = navigation.getState().routes.find(r => r.name === 'Home')?.params?.menu || [];
                                handleAddMenu(currentMenu);
                                console.log("dish: " + dish + ", description: " + description + ", price: " + price + ", course: " + course);
                                setError(false);
                            } else {
                                setError(true);
                            }
                        }}
                    />
                    {error && <Text style={styles.errorText}>Please fill in all fields</Text>}
                </View>
          
        </SafeAreaView>
    );
}

function isEmpty(value: string) {
    return (
        value == null ||
        (value.hasOwnProperty('length') && value.length === 0) ||
        (value.constructor === Object && Object.keys(value).length === 0)
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
        width: '100%',
        height: '100%',
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
