import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import Globals from '../utils/globals';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Interpreter_3 = () => {
  const [textFirstHalf, setTextFirstHalf] = useState('');
  const [textSecondHalf, setTextSecondHalf] = useState('');
  const [languageFrom, setLanguageFrom] = useState('');
  const [languageTo, setLanguageTo] = useState('');
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    fetchLanguages(); // Llamar a la función para cargar los idiomas
  }, []);

  const fetchLanguages = async () => {
    try {
      const response = await fetch(`http://${Globals.ENDPOINT_IP}:3000/languages`);
      if (!response.ok) {
        throw new Error('Failed to fetch languages');
      }
      const data = await response.json();
      setLanguages(data); // Guardar los idiomas en el estado
      // Establecer idiomas por defecto
      setLanguageFrom(data[0]?.abbreviation || '');
      setLanguageTo(data[1]?.abbreviation || '');
    } catch (error) {
      console.error('Error fetching languages:', error);
    }
  };

  const handleMicPressFirstHalf = () => {
    setTextFirstHalf('Escuchando usuario...');
  };

  const handleMicPressSecondHalf = () => {
    setTextSecondHalf('Escuchando usuario...');
  };

  const handleLanguageFromChange = (value) => {
    setLanguageFrom(value);
  };

  const handleLanguageToChange = (value) => {
    setLanguageTo(value);
  };

  return (
    <View style={styles.container}>
      {/* Primera mitad */}
      <View style={[styles.halfContainer, styles.firstHalf]}>
        <TouchableOpacity style={styles.micButtonFirstHalf} onPress={handleMicPressFirstHalf}>
          <Ionicons name="mic" size={32} color="white" />
        </TouchableOpacity>
        <TextInput
          style={[styles.input, styles.textInputFirstHalf]}
          placeholder={`${languages.find(lang => lang.abbreviation === languageFrom)?.name} (${languageFrom})`}
          onChangeText={setTextFirstHalf}
          value={textFirstHalf}
          multiline={true}
          numberOfLines={4}
        />
      </View>

      {/* División en medio */}
      <View style={styles.middleContainer}>
        {/* Dropdowns y icono */}
        <View style={styles.middleContent}>
          <Picker
            selectedValue={languageFrom}
            style={styles.picker}
            onValueChange={handleLanguageFromChange}
            itemStyle={{ fontSize: 50 }}>
            {languages.map((lang) => (
              <Picker.Item key={lang.abbreviation} label={lang.name} value={lang.abbreviation} />
            ))}
          </Picker>

          <Ionicons name="sync" size={32} color="black" style={styles.icon} />

          <Picker
            selectedValue={languageTo}
            style={styles.picker}
            onValueChange={handleLanguageToChange}>
            {languages.map((lang) => (
              <Picker.Item key={lang.abbreviation} label={lang.name} value={lang.abbreviation} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Segunda mitad */}
      <View style={[styles.halfContainer, styles.secondHalf]}>
        <TouchableOpacity style={styles.micButtonSecondHalf} onPress={handleMicPressSecondHalf}>
          <Ionicons name="mic" size={32} color="white" />
        </TouchableOpacity>
        <TextInput
          style={[styles.input, styles.textInputSecondHalf]}
          placeholder={`${languages.find(lang => lang.abbreviation === languageTo)?.name} (${languageTo})`}
          onChangeText={setTextSecondHalf}
          value={textSecondHalf}
          multiline={true}
          numberOfLines={4}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  halfContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Para posicionar el botón sobre el cuadro de texto
  },
  firstHalf: {
    backgroundColor: '#FFD700', // Color dorado
  },
  secondHalf: {
    backgroundColor: '#8A2BE2', // Color violeta
  },
  middleContainer: {
    height: windowHeight / 10,
    backgroundColor: '#ADD8E6', // Color azul claro
  },
  input: {
    width: '90%',
    height: '60%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  textInputFirstHalf: {
    marginTop: '15%', // Espacio en la parte superior
  },
  textInputSecondHalf: {
    marginTop: '-15%', // Sin espacio en la parte superior
  },
  middleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    width: '100%',
    height: '100%',
  },
  picker: {
    flex: 1,
    height: 10,
    marginHorizontal: 1,
  },
  icon: {
    marginHorizontal: 10,
  },
  micButtonFirstHalf: {
    position: 'absolute',
    backgroundColor: 'blue', // Color azul para la primera mitad
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    top: '8%', // Posición arriba para la primera mitad
  },
  micButtonSecondHalf: {
    position: 'absolute',
    backgroundColor: 'red', // Color rojo para la segunda mitad (ejemplo)
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: '8%', // Posición abajo para la segunda mitad
  },
});
export default Interpreter;