import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { DataTable } from 'react-native-paper';

const MetodeJacobi: React.FC = () => {
    const [matrixA, setMatrixA] = useState<string>('');
    const [vectorB, setVectorB] = useState<string>('');
    const [initialGuess, setInitialGuess] = useState<string>('');
    const [iterations, setIterations] = useState<number[][]>([]);
    const [tolerance, setTolerance] = useState<number>(1e-6);

    const parseInput = (input: string): number[][] => {
        return input.split('\n').map(row => row.split(',').map(Number));
    };

    const handleSolve = () => {
        const A = parseInput(matrixA);
        const b = parseInput(vectorB).flat();
        const x0 = parseInput(initialGuess).flat();

        if (A.some(row => row.length !== A.length)) {
            Alert.alert('Kesalahan Input', 'Matriks A harus berbentuk persegi.');
            return;
        }

        if (b.length !== A.length || x0.length !== A.length) {
            Alert.alert('Kesalahan Input', 'Vektor b dan tebakan awal x0 harus sesuai dengan dimensi matriks A.');
            return;
        }

        const maxIterations = 100;
        const n = A.length;
        let x = [...x0];
        let newIterations: number[][] = [];

        for (let k = 0; k < maxIterations; k++) {
            let xBaru = [...x];
            for (let i = 0; i < n; i++) {
                let sum = b[i];
                for (let j = 0; j < n; j++) {
                    if (i !== j) {
                        sum -= A[i][j] * x[j];
                    }
                }
                xBaru[i] = sum / A[i][i];
            }
            newIterations.push([...xBaru]);
            if (Math.max(...xBaru.map((xi, idx) => Math.abs(xi - x[idx]))) < tolerance) {
                break;
            }
            x = [...xBaru];
        }
        setIterations(newIterations);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={{marginTop: 20,fontSize: 16,fontWeight: 'bold',marginBottom: 10,color: '#333',}}>Metode Jacobi</Text>
                <Text style={styles.label}>Matriks A (dipisahkan dengan koma, baris per baris):</Text>
                <TextInput
                    multiline
                    style={styles.input}
                    value={matrixA}
                    onChangeText={setMatrixA}
                    placeholder="Contoh: 1,2,1\n1,3,2\n2,1,2"
                />
                <Text style={styles.label}>Vektor b (dipisahkan dengan koma):</Text>
                <TextInput
                    multiline
                    style={styles.input}
                    value={vectorB}
                    onChangeText={setVectorB}
                    placeholder="Contoh: 6\n9\n12"
                />
                <Text style={styles.label}>Tebakan Awal x0 (dipisahkan dengan koma):</Text>
                <TextInput
                    multiline
                    style={styles.input}
                    value={initialGuess}
                    onChangeText={setInitialGuess}
                    placeholder="Contoh: 0,0,0"
                />
                <Button title="Hitung" onPress={handleSolve} />
                {iterations.length > 0 && (
                    <View style={styles.resultsContainer}>
                        <Text style={styles.resultsTitle}>Hasil:</Text>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Iterasi</DataTable.Title>
                                {Array.from({ length: iterations[0].length }, (_, i) => (
                                    <DataTable.Title key={i}>x{i + 1}</DataTable.Title>
                                ))}
                            </DataTable.Header>
                            {iterations.map((iter, index) => (
                                <DataTable.Row key={index}>
                                    <DataTable.Cell>{index + 1}</DataTable.Cell>
                                    {iter.map((val, i) => (
                                        <DataTable.Cell key={i}>
                                            <Text style={styles.resultText}>{val.toFixed(6)}</Text>
                                        </DataTable.Cell>
                                    ))}
                                </DataTable.Row>
                            ))}
                        </DataTable>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    input: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    resultsContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        elevation: 2,
    },
    resultsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    resultText: {
        color: '#000',
    },
});

export default JacobiMethod;
