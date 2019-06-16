const styles = theme => ({
    wrap: {
        [theme.breakpoints.up("md")]: {
            marginTop: '4rem'
        },
    },
    edit: {
        width: 120,
        height: 30,
        color: "white",
        backgroundColor: "#3F51B5",
        marginLeft: '1.2rem',
        marginTop: '8px',
        fontSize: "0.7rem",
        [theme.breakpoints.down("sm")]: {
            width: '100%',
            marginLeft: 0,
            fontSize: "0.6rem"
        }
    },
    delete: {
        width: 130,
        height: 30,
        color: "white",
        backgroundColor: "#3F51B5",
        marginLeft: '1.2rem',
        marginTop: '8px',
        fontSize: "0.7rem",
        [theme.breakpoints.down("sm")]: {
            width: '100%',
            marginLeft: 0,
            fontSize: "0.5rem"
        }
    },
    loginControl: {
        [theme.breakpoints.down("sm")]: {
            fontSize: '1.1rem'
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: '0.9rem'
        },
    },
    avatar: {
        margin: '10px 70px 10px 20px',
        width: 170,
        height: 170,
        fontSize: '3rem',
        alignSelf: 'center',
        [theme.breakpoints.down("sm")]: {
            width: 150,
            height: 150,
            margin: '5px 50px 10px 20px',
        },
        [theme.breakpoints.down("xs")]: {
            width: 140,
            height: 140,
            margin: '5px 30px 10px 20px',
        }
    },
    typography: {
        marginBottom: 10,
    }

});
export default styles;
