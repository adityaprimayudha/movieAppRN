import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242a32',
  },
  logo: {
    flex: 1,
    width: 100,
    height: 100,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#242a32',
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 5,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
  },
  textInput: {
    backgroundColor: '#3A3F47',
    borderRadius: 10,
    marginVertical: 10,
    marginLeft: 10,
    paddingVertical: 5,
    paddingLeft: 20,
    paddingRight: 30,
    color: '#fff',
    flex: 0.8,
  },
  detailSubtitle: {
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 20,
    marginRight: 10,
    marginTop: 5,
    textAlign: 'justify',
  },
  detailDesc: {
    color: 'white',
    fontSize: 13,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'justify',
  },
});
