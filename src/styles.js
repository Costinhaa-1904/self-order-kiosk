import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles((themes) => ({

    root: { heigh:'100vh', display: 'flex',flexDirection:'column',},
    main: { flex:1, overflow: 'auto', flexDirection:'column', display: 'flex', color: '#ffffff'},
    center: { display:'flex', justifyContent: 'center', alignItems: 'center', textAlign:'center',},
    cards: { display:'flex', justifyContent: 'center', alignItems: 'center',},
    navy: { backgroundColor: '#003080',},
    red: { backgroundColor: '#ff2040', color:'#ffffff',},   
    largeLogo: { height:50,},
    logo: { height:100,},
    card: {margin: 10},
    title: {marginTop: 20,},
    space: {padding: 10,},
    media: { width: 200},
    largeButton: { width: 250,},
    largeInput: { width:'60px!important', padding:'0!important', fontSize:'35px!important', textAlign:'center!important'},
    bordered: {borderWidth: 2, borderRadius: 5, margin: 5, borderStyle:'solid',},
    row: { display:'flex', padding: 10,},
    around: {justifyContent: 'space-around',},
    between: {justifyContent: 'space-between',},
    column: {flexDirection: 'column'},
    btn : {marginRight:'.5rem'}
}));