import { router } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Row, Rows, Table, TableWrapper } from 'react-native-table-component';

export default function TablesDb({ tables }: { tables: Record<string, any[]> }) {
    if (!tables || Object.keys(tables).length === 0) {
    return (
        <Text>Aucune table à afficher</Text>
    );
  }

    return (
        <ScrollView>
            {Object.entries(tables).map(([tableName, rows]) => (
                <View key={tableName} className='bg-gray-500'>
                    <Text className="text-white text-center font-bold text-lg">{tableName}</Text>
                    <Table borderStyle={{ borderWidth: 2, borderColor: '#ccc' }}>
                        <TableWrapper key={tableName}>
                            <Row data={Object.keys(rows[0])} style={{ backgroundColor: '#fff' }} textStyle={{ fontWeight: 'bold', textAlign: 'center' }}/>
                            <Rows data={rows.map(row => Object.values(row))} style={{ backgroundColor: '#ddd' }} textStyle={{ textAlign: 'center' }} />
                        </TableWrapper>
                    </Table>
                </View>
            ))}
            <TouchableOpacity onPress={() => router.back()} className='bg-blue-500 p-4 m-4 rounded-lg items-center'>
                <Text>Retour</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}