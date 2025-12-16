import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {screenWidth} from '../utils/metrics';

const COLUMN_WIDTHS = {
  status: 100,
  totalWork: 80,
  estimate: 100,
  tsCost: 100,
  budget: 120,
  expenditure: 120,
};

const headWiseData = [
  {title: 'Building'},
  {title: 'CRF'},
  {title: 'Annuity'},
  {title: '2515'},
  {title: 'Deposit'},
  {title: 'DPDC'},
  {title: 'Gat_A'},
  {title: 'Gat_D'},
  {title: 'Gat_B|C|F'},
  {title: 'MLA'},
  {title: 'Nabard'},
  {title: '2059'},
  {title: '2216'},
  {title: 'SH & DOR'},
  {title: 'MP'},
  {title: 'Total Head Abstract Report'},
];

const HeadWiseReportSection = ({navigation, fetchFunctions}) => {
  const [expandedHead, setExpandedHead] = useState(null);
  const [headWiseDataResult, setHeadWiseDataResult] = useState([]);
  const [selectedHeadWiseData, setSelectedHeadWiseData] = useState([]);

  const handleHeadWiseSelection = async title => {
    if (expandedHead === title) {
      setExpandedHead(null);
      setHeadWiseDataResult([]);
      return;
    }

    setExpandedHead(title);
    setSelectedHeadWiseData([title]);

    const fetchFunc = fetchFunctions[title];
    if (fetchFunc) {
      const result = await fetchFunc();
      setHeadWiseDataResult(result?.data || []);
    } else {
      setHeadWiseDataResult([]);
    }
  };

  return (
    <View style={styles.headWiseContainer}>
      <Text style={styles.headWiseTitle}>Head Wise Abstract Report</Text>

      {headWiseData.map((item, index) => (
        <View key={index}>
          <View style={styles.headRow}>
            <TouchableOpacity
              style={styles.plusIconContainer}
              onPress={() => handleHeadWiseSelection(item.title)}>
              <Icon
                name={expandedHead === item.title ? 'minus' : 'plus'}
                size={14}
                color="#fff"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('HeadWiseReportScreen', {
                  selectedHead: item.title,
                })
              }>
              <Text style={styles.headRowText}>{item.title}</Text>
            </TouchableOpacity>
          </View>

          {expandedHead === item.title && (
            <ScrollView horizontal style={styles.tableContainer}>
              <View>
                <View style={styles.tableHeader}>
                  <Text
                    style={[styles.tableCell, {width: COLUMN_WIDTHS.status}]}>
                    Work Status
                  </Text>
                  <Text
                    style={[
                      styles.tableCell,
                      {width: COLUMN_WIDTHS.totalWork},
                    ]}>
                    Total Work
                  </Text>
                  <Text
                    style={[styles.tableCell, {width: COLUMN_WIDTHS.estimate}]}>
                    Estimated Cost
                  </Text>
                  <Text
                    style={[styles.tableCell, {width: COLUMN_WIDTHS.tsCost}]}>
                    T.S Cost
                  </Text>
                  <Text
                    style={[styles.tableCell, {width: COLUMN_WIDTHS.budget}]}>
                    Budget Provision
                  </Text>
                  <Text
                    style={[
                      styles.tableCell,
                      {width: COLUMN_WIDTHS.expenditure},
                    ]}>
                    Expenditure
                  </Text>
                </View>

                {headWiseDataResult.map((row, i) => (
                  <View key={i} style={styles.tableRow}>
                    <Text
                      style={[styles.tableCell, {width: COLUMN_WIDTHS.status}]}>
                      {row['Work Status']}
                    </Text>
                    <Text
                      style={[
                        styles.tableCell,
                        {width: COLUMN_WIDTHS.totalWork},
                      ]}>
                      {row['Total Work']}
                    </Text>
                    <Text
                      style={[
                        styles.tableCell,
                        {width: COLUMN_WIDTHS.estimate},
                      ]}>
                      {row['Estimated Cost']}
                    </Text>
                    <Text
                      style={[styles.tableCell, {width: COLUMN_WIDTHS.tsCost}]}>
                      {row['T.S Cost']}
                    </Text>
                    <Text
                      style={[styles.tableCell, {width: COLUMN_WIDTHS.budget}]}>
                      {row['Budget Provision 2023-2024']}
                    </Text>
                    <Text
                      style={[
                        styles.tableCell,
                        {width: COLUMN_WIDTHS.expenditure},
                      ]}>
                      {row['Expenditure 2023-2024']}
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          )}
        </View>
      ))}
    </View>
  );
};

export default HeadWiseReportSection;

const styles = StyleSheet.create({
  headWiseContainer: {
    width: screenWidth - 30,
    margin: 16,
    borderWidth: 2,
    borderColor: '#800000',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  headWiseTitle: {
    backgroundColor: '#999',
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  headRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#aabbee',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headRowText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  plusIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  tableContainer: {
    marginLeft: 40,
    marginTop: 10,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#d0e8d0',
    paddingVertical: 8,
    borderRadius: 4,
  },
  tableCell: {
    fontSize: 12,
    color: '#000',
    paddingHorizontal: 4,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
});
