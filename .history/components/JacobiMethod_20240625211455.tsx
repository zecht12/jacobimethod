import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { DataTable } from 'react-native-paper';

const JacobiMethod: React.FC = () => {
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

        if (A.length !== 3 || A.some(row => row.length !== 3) || b.length !== 3 || x0.length !== 3) {
            alert('Input harus berupa 3 baris dengan 3 kolom pada masing-masing baris.');
            return;
        }

        const maxIterations = 100;
        const n = A.length;
        let x = [...x0];
        let newIterations: number[][] = [];

        for (let k = 0; k < maxIterations; k++) {
            let xNew = [...x];
            for (let i = 0; i < n; i++) {
                let sum = b[i];
                for (let j = 0; j < n; j++) {
                    if (i !== j) {
                        sum -= A[i][j] * x[j];
                    }
                }
                xNew[i] = sum / A[i][i];
            }
            newIterations.push([...xNew]);
            if (Math.max(...xNew.map((xi, idx) => Math.abs(xi - x[idx]))) < tolerance) {
                break;
            }
            x = [...xNew];
        }
        setIterations(newIterations);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text>Matriks A (dipisahkan dengan koma, baris per baris):</Text>
                <TextInput
                    multiline
                    style={styles.input}
                    value={matrixA}
                    onChangeText={setMatrixA}
                    placeholder="Contoh: 1,2,1\n1,3,2\n2,1,2"
                />
                <Text>Vektor b (dipisahkan dengan koma):</Text>
                <TextInput
                    multiline
                    style={styles.input}
                    value={vectorB}
                    onChangeText={setVectorB}
                    placeholder="Contoh: 6\n9\n12"
                />
                <Text>Tebakan Awal x0 (dipisahkan dengan koma):</Text>
                <TextInput
                    multiline
                    style={styles.input}
                    value={initialGuess}
                    onChangeText={setInitialGuess}
                    placeholder="Contoh: 0,0,0"
                />
                <Button title="Hitung" onPress={handleSolve} />
                {iterations.length > 0 && (
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
                                    <DataTable.Cell key={i}>{val.toFixed(6)}</DataTable.Cell>
                                ))}
                            </DataTable.Row>
                        ))}
                    </DataTable>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
    },
});

export default JacobiMethod;
