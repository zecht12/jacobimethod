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
        <Safe
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
