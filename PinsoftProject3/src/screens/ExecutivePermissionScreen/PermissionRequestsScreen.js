import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList

} from 'react-native';
import { useThemeContext } from '../../../ThemeContext';
import { useSelector } from 'react-redux';
import axios from 'axios';

function PermissionRequestsScreen() {
  const [permissionRequests, setPermissionRequests] = useState([]);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activePermissionIndex, setActivePermissionIndex] = useState(null);

  const login = useSelector((state) => state.data.login);
  const token = login.token;

  useEffect(() => {
    axios
      .get(
        'https://time-off-tracker-production.up.railway.app/time-off/get-my-time-off',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      .then(
        (response) => {
          const transformedData = response.data
            .filter((perm) => perm.timeOffType === 'APPROVED')
            .map((prem) => {
              const StartDate = new Date(prem.startDate);
              const EndDate = new Date(prem.endDate);
              const formattedStartDate = StartDate.toISOString().split('T')[0];
              const formattedEndDate = EndDate.toISOString().split('T')[0];
              return {
                id: prem.id,
                user: `${prem.employee.firstName} ${prem.employee.lastName}`,
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                permission: prem.description,
                state: prem.timeOffType,
              };
            });
          setPermissionRequests(transformedData);

          if (response) {
            console.log('Succses');
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const handlePermissionClick = (permission, index) => {
    setSelectedPermission(permission);
    setActivePermissionIndex(index);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedPermission(null);
    setIsModalVisible(false);
  };

  const { isDarkModeOn, toggleSwitch } = useThemeContext();
  const textColor = isDarkModeOn ? 'white' : '#0A2647';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkModeOn ? '#171d2b' : '#f2f2f2' },
      ]}
    >
       <Text style={[styles.header, { color: textColor }]}>
          {' '}
          Approved Requests{' '}
        </Text>
      <ScrollView style={{ flex: 1 }}>
       
        {permissionRequests.map((permission) => (
          <TouchableOpacity
            key={permission.id}
            style={{
              flex: 1,
              flexWrap: 'wrap',
              paddingVertical: 10,
              paddingHorizontal: 15,
              borderWidth: 1.2,
              borderColor: '#aaa',
              borderRadius: 10,
              marginBottom: 20,
            }}
            onPress={() => handlePermissionClick(permission)}
          >
            <Text style={[styles.permissionTitle, { color: textColor ,fontWeight:'bold'}]}>
          From {permission.startDate}   To {permission.endDate}
        </Text>
        <Text style={[styles.permissionTitle, { color: textColor }]}>
          "{permission.permission}"
        </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal visible={isModalVisible} animationType='fade' transparent>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            ...Platform.select({
              web: {
                
              },
            }),
          }}
          onPress={handleCloseModal}
        >
          <View
            style={{ padding: 40, backgroundColor: 'white', borderRadius: 20 }}
          >
            {selectedPermission && (
              <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom:10 }}>
                  Permission Info
                </Text>
                <Text>Reason: {selectedPermission.permission}</Text>
                <Text>Start Date: {selectedPermission.startDate}</Text>
                <Text>End Date: {selectedPermission.endDate}</Text>
                <Text>Status: {selectedPermission.state}</Text>
                <Text></Text>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginTop: 10,
                  }}
                >
                  <Button
                    title='Close'
                    onPress={handleCloseModal}
                    color='#0f396b'
                    borderRadius='100'
                    style={{
                      width: 100,
                      marginTop: 10,
                    }}
                  />
                </View>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    ...Platform.select({
      web: {
        alignItems: "center",
      },
    }),
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "white",
    alignSelf: "center",

    ...Platform.select({
      web: {},
    }),
  },
  listContent: {
    marginTop: 0,
  },
  permissionItem: {
    
    justifyContent: "space-between",
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1.2,
    borderColor: "#bbb",
    borderRadius: 10,
  },
  permissionTitle: {
    fontSize: 16,
    
  },
  button: {
    borderRadius: 100,
  },
  start: {
    marginRight: 12,
    borderRightWidth: 1,
    borderColor: '#ccc',
    paddingRight: 10,
    fontSize: 16,
  },
  end: {
    fontSize: 16,
    marginLeft:1,
  },
  userInfo: {
    marginRight: 12,
    borderRightWidth: 1,
    borderColor: '#ccc',
    paddingRight: 10,
    fontSize: 16,
  },
});
export default PermissionRequestsScreen;
