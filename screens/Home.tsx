import React from 'react';
import { Image, View, Text, FlatList, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './RootStackParams';
import { useRoute } from '@react-navigation/native';

// Types for navigation
type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

interface Menu {
    dish: string;
    description: string;
    price: string;
    course: 'Starter' | 'Main' | 'Dessert'; // Add more courses if necessary
}

export default function HomeScreen() {
    const route = useRoute<HomeScreenRouteProp>();
    const menu: Menu[] = route.params?.menu || [];
    const navigation = useNavigation<homeScreenProp>();

    // Group menu items by course
    const groupedMenu: {
        Starter: Menu[];
        Main: Menu[];
        Dessert: Menu[];
    } = {
        Starter: menu.filter(item => item.course === 'Starter'),
        Main: menu.filter(item => item.course === 'Main'),
        Dessert: menu.filter(item => item.course === 'Dessert'),
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.main}>
                    <Text style={styles.titleText}>Fancy And Delight</Text>
                    <Text style={styles.menuCount}>Total Menu: {menu.length}</Text>
                </View>

                {/* Render grouped menu items */}
                {Object.keys(groupedMenu).map((course) => {
                    // Type assertion: we are sure the course is one of 'Starter', 'Main', or 'Dessert'
                    const typedCourse = course as keyof typeof groupedMenu;

                    return (
                        <View style={styles.con2} key={typedCourse}>
                            <View style={styles.courseContainer}>
                                <Text style={styles.courseTitle}>{typedCourse}</Text>

                                
                                <Image
                                    source={require('../assets/Fancy_And_Delight.png')}
                                    style={styles.headerImage} // You can style it
                                    resizeMode="contain" // Optional, for better image scaling
                                />

                                <FlatList
                                    data={groupedMenu[typedCourse]} // No error now since `typedCourse` is correctly typed
                                    keyExtractor={(item, index) => `${item.dish}-${index}`}
                                    ListEmptyComponent={
                                        <Text style={styles.noDishesText}>
                                            No {typedCourse.toLowerCase()} dishes available.
                                        </Text>
                                    }
                                    renderItem={({ item }) => (
                                        <View style={styles.menuItem}>
                                            <Text style={styles.dishName}>- {item.dish}</Text>
                                            <Text style={styles.dishDescription}>{item.description}</Text>
                                            <Text style={styles.dishPrice}>R: {item.price}</Text>
                                        </View>
                                    )}
                                />
                            </View>
                        </View>
                    );
                })}
            </ScrollView>

            {/* Navigation Pane */}
            <View style={styles.navPane}>
                <TouchableOpacity onPress={() => navigation.navigate('AddRecipe')}>
                    <Text style={styles.navButtonText}>Add Menu Item</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 5,
    },
    con2: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 20,
    },
    main: {
        height: 100,
        width: 350,
        backgroundColor: 'white',
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 20,
        borderWidth: 4,
    },
    titleText: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
        color: 'black',
    },
    menuCount: {
        fontSize: 18,
        marginBottom: 16,
        color: 'black',
    },
    menuItem: {
        backgroundColor: 'white',
        padding: 30,
        marginVertical: 10,
        borderRadius: 10,
        width: 300,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        textAlign: 'center',
    },
    dishName: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
    },
    dishDescription: {
        fontSize: 25,
        color: 'gray',
        marginTop: 20,
    },
    dishPrice: {
        fontSize: 20,
        color: 'black',
    },
    noDishesText: {
        fontSize: 18,
        color: 'gray',
        textAlign: 'center',
    },
    courseContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        width: 350,
    },
    courseTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        backgroundColor: '#bc594e',
        padding: 10,
        color: 'white',
    },
    navPane: {
        height: 60,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        bottom: 0,
        flexDirection: 'row',
    },
    navButtonText: {
        fontSize: 18,
        color: 'black',
    },
    headerImage: {
        width: 300, 
        height: 200, 
        marginVertical: 20,
    },
});
