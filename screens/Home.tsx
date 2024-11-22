import React from 'react';  
import {  
    SectionList,  
    View,  
    Text,  
    StyleSheet,  
    SafeAreaView,  
    TouchableOpacity,  
    Image,  
} from 'react-native';  
import { useNavigation, useRoute } from '@react-navigation/native';  
import { StackNavigationProp } from '@react-navigation/stack';  
import { RootStackParamList } from './RootStackParams';  

// Types for navigation  
type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;  

interface Menu {  
    dish: string;  
    description: string;  
    price: string;  
    course: 'Starter' | 'Main' | 'Dessert'; // Add more courses if necessary  
}  

export default function HomeScreen() {  
    const route = useRoute<any>();  
    const menu: Menu[] = route.params?.menu || [];  
    const navigation = useNavigation<HomeScreenProp>();  

    // Group menu items by course  
    const groupedMenu = [  
        { title: 'Starter', data: menu.filter((item) => item.course === 'Starter') },  
        { title: 'Main', data: menu.filter((item) => item.course === 'Main') },  
        { title: 'Dessert', data: menu.filter((item) => item.course === 'Dessert') },  
    ];  

    const renderItem = ({ item }: { item: Menu }) => (  
        <View style={styles.menuItem}>  
            <Text style={styles.dishName}>- {item.dish}</Text>  
            <Text style={styles.dishDescription}>{item.description}</Text>  
            <Text style={styles.dishPrice}>R: {item.price}</Text>  
        </View>  
    );  

    const renderSectionHeader = ({ section }: { section: { title: string } }) => (  
        <View style={styles.courseContainer}>  
            <Text style={styles.courseTitle}>{section.title}</Text>  
            <Image  
                source={require('../assets/Fancy_And_Delight.png')}  
                style={styles.headerImage} // Optional styling  
                resizeMode="contain"  
            />  
        </View>  
    );  

    return (  
        <SafeAreaView style={styles.container}>  
            <SectionList  
                sections={groupedMenu}  
                keyExtractor={(item, index) => item.dish + index}  
                renderItem={renderItem}  
                renderSectionHeader={renderSectionHeader}  
                ListHeaderComponent={() => (  
                    <View style={styles.main}>  
                        <Text style={styles.titleText}>Fancy And Delight</Text>  
                        <Text style={styles.menuCount}>Total Menu: {menu.length}</Text>  
                    </View>  
                )}  
                contentContainerStyle={styles.sectionListContent} // Center content  
                stickySectionHeadersEnabled  
            />  
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
        justifyContent: 'center', // Center vertically  
        alignItems: 'center', // Center horizontally  
    },  
    main: {  
        height: 100,  
        width: 350,  
        backgroundColor: 'white',  
        marginVertical: 10,  
        justifyContent: 'center',  
        alignItems: 'center',  
        borderRadius: 30,  
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
        padding: 20,  
        marginVertical: 10,  
        borderRadius: 10,  
        width: 300,  
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
        marginTop: 10,  
        textAlign: 'center',  
    },  
    dishPrice: {  
        fontSize: 20,  
        color: 'black',  
    },  
    courseContainer: {  
        backgroundColor: 'white',  
        padding: 10,  
        borderRadius: 10,  
        width: '100%', // Full width on screen  
        alignItems: 'center', // Center items inside  
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
        alignSelf: 'center', // Center the image  
    },  
    sectionListContent: {  
        alignItems: 'center', // Center all content within the section list  
    },  
});