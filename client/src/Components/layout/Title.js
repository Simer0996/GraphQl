import React from 'react'

const getStyles = () => ({
    title: {
        fontSize: 50,
        padding: "15px",
        marginBottom: "50p"
    }
}
)
const Title = () => {
    const styles = getStyles()

    return (
        <h1 style={styles.title}>It's all about who you know!</h1>
    )
}

export default Title