import React, { useState } from "react";
import { Snackbar } from "react-native-paper";

const CustomSnackbar = ({ message, visible, onDismissSnackBar }) => {

    return (
        <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            action={{
                label: 'Okay',
                onPress: () => {
                    onDismissSnackBar();
                },
            }}>
            {message}
        </Snackbar>
    )
}

export default CustomSnackbar