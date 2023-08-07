import { StyleSheet, View, Text } from "react-native"
import { useAuthContext } from "../context/AuthContext"

const HomeScreen = () => {
    const {user} = useAuthContext();

    return <View style={styles.container}>
        {user && <Text style={styles.text}>Welcome {`${user?.first_name} ${user?.last_name}`}</Text>}
    </View>
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text:{
        fontSize: 30
    }
})

export default HomeScreen