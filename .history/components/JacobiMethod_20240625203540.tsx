import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
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
        <ScrollView style={styles.container}>
            <Text>Matriks A (dipisahkan dengan koma, baris per baris):</Text>
            <TextInput
                multiline
                style={styles.input}
                value={matrixA}
                onChangeText={setMatrixA}
            />
            <Text>Vektor b (dipisahkan dengan koma):</Text>
            <TextInput
                multiline
                style={styles.input}
                value={vectorB}
                onChangeText={setVectorB}
            />
            <Text>Tebakan Awal x0 (dipisahkan dengan koma):</Text>
            <TextInput
                multiline
                style={styles.input}
                value={initialGuess}
                onChangeText={setInitialGuess}
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
    );
};

const styles = StyleSheet.create({
    container: {
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
