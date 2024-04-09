import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, Image, TextInput, Button } from 'react-native';
import { db } from '../../firebase/config';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goleadores: [],
            nuevoNombre: '',
            nuevosGoles: '',
        };
    }

    componentDidMount() {
        this.cargarGoleadores();
    }

    cargarGoleadores = async () => {
        try {
            const response = await db.collection('goleadores').orderBy('goles', 'desc').get();
            const goleadores = response.docs.map((doc, index) => ({ ...doc.data(), posicion: index + 1 }));
            this.setState({ goleadores });
        } catch (error) {
            console.error('Error al cargar los goleadores:', error);
        }
    };

    agregarGoleador = async () => {
        try {
            await db.collection('goleadores').add({
                nombre: this.state.nuevoNombre,
                goles: parseInt(this.state.nuevosGoles)
            });
            this.setState({ nuevoNombre: '', nuevosGoles: '' });
            this.cargarGoleadores();
        } catch (error) {
            console.error('Error al agregar el goleador:', error);
        }
    };

    renderGoleadorItem = ({ item }) => {
        let emoji = '';
        if (item.posicion === 1) {
            emoji = '👑'; // Primer lugar
        } else if (item.goles >= 10) {
            emoji = '⚽'; // 10 o más goles
        } else {
            emoji = '👍'; // Menos de 10 goles
        }

        return (
            <View style={styles.goleadorItem}>
                <Text style={styles.goleadorText}>{item.posicion}. {emoji} {item.nombre}: {item.goles} goles</Text>
            </View>
        );
    };

    render() {
        const { goleadores } = this.state;
        const mostrarScroll = goleadores.length > 6; // Determinar si se debe mostrar el scroll
        const maxHeight = mostrarScroll ? 6 * 50 : null; // Altura máxima del contenedor de FlatList

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>TocoYmeVoy</Text>
                    <Image
                        style={styles.logo}
                        source={require('/Users/mateo/OneDrive/Escritorio/coding/tocoymevoy/assets/logo.png')}
                    />
                </View>
                <View style={styles.section}>
                    <View style={styles.sectionTitle}>
                        <Text style={styles.sectionTitleText}>Tabla de goleadores</Text>
                        <View style={[styles.tableContainer, { maxHeight }]}>
                            <FlatList
                                data={goleadores}
                                renderItem={this.renderGoleadorItem}
                                keyExtractor={(item, index) => index.toString()}
                                style={styles.flatList}
                                scrollEnabled={mostrarScroll} // Habilitar scroll vertical si hay más de 6 goleadores
                            />
                        </View>
                        <View style={styles.nuevoGoleador}>
                            <TextInput
                                style={styles.input}
                                placeholder="Nombre"
                                value={this.state.nuevoNombre}
                                onChangeText={text => this.setState({ nuevoNombre: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Goles"
                                keyboardType="numeric"
                                value={this.state.nuevosGoles}
                                onChangeText={text => this.setState({ nuevosGoles: text })}
                            />
                            <Button style={styles.boton} title="Agregar" onPress={this.agregarGoleador} />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E0F7FA', // Fondo principal verde
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 10,
        color: '#000', // Texto del encabezado negro
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        left: 95,
        margin:10
    },
    section: {
        flex: 1,
        width: '100%',
    },
    sectionTitle: {
        marginBottom: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    sectionTitleText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000', // Texto de título de sección negro
        marginLeft: 10
    },
    tableContainer: {
        flex: 1, // Asegura que la lista tome todo el espacio disponible
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: '#000', // Borde negro
        borderRadius: 5,
        width: '90%',
        marginBottom: 10,
    },
    flatList: {
        flex: 1,
        backgroundColor: '#FFF', // Fondo de la lista
    },
    goleadorItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#000', // Borde inferior negro
    },
    goleadorText: {
        fontSize: 16,
        color: '#000', // Texto de los elementos de la lista negro
    },
    nuevoGoleador: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        borderWidth: 1,
        borderColor: '#000', // Borde negro
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
        color: '#000', // Color de texto del input negro
        width: '30%', // Ajusta el ancho del input
        height: 35,
        margin: 10
    },
    boton: {
        height: 20,
        margin: 10,
        textAlign: 'center',
    }
});

