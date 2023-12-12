import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, createTheme, ThemeProvider, Tabs, Tab, FormControlLabel, Checkbox } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TabPanel from './components/TabPanel';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import AlertDialog from './components/AlertDialog';

/**
 * SignUp Component
 * 
 * A React component for user sign-up using Material-UI.
 * It includes form fields for email, password, and user type.
 * The user type is chosen between 'Buyer' and 'Organization' using tabs.
 * For organizations, an additional checkbox is provided.
 * An AlertDialog is displayed if the form is submitted without filling required information.
 *
 * @component
 * @example
 * // Usage in another component or file
 * import SignUp from './SignUp';
 * // ... other imports
 * 
 * const MyComponent = () => {
 *   return (
 *     <SignUp />
 *   );
 * }
 */

const defaultTheme = createTheme();

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('buyer');
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); 
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    setIsFormSubmitted(true); // Set form submission to true

    if ((!email || !password) || (userType == 'org' && !checkboxChecked)) {
      setShowAlertDialog(true);
      return;
    }

    // Perform sign-up logic using supabase
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (userType === 'org') {
      // Add to the 'organizations' table
      await supabase.from('admin').upsert({
        org_id: data?.user?.id,  // The user's ID from auth.users
        email: data?.user?.email, // The user's email
      });
      
    } else {
      // Add to the 'buyers' table
      await supabase.from('buyers').upsert({
        id: data?.user?.id,  // The user's ID from auth.users
        email: data?.user?.email, // The user's emai
      });
    }

    error ? console.log(error) : navigate('/signin');
  };

  const handleUserTypeChange = (newUserType) => {
    setUserType(newUserType);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Tabs value={userType} onChange={() => handleUserTypeChange(userType === 'buyer' ? 'org' : 'buyer')} centered>
              <Tab label="Buyer" value="buyer" />
              <Tab label="Organization" value="org" />
            </Tabs>
          </Box>

          <TabPanel userType={userType} index={0} value={0}>
            <Box component="form" onSubmit={handleSignUp} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {userType === 'org' && (
            <FormControlLabel
              required
              control={ <Checkbox
                onChange={(e) => setCheckboxChecked(e.target.checked)}
              />}
              label="By using this system, I agree to contact my municipality and purchase all necessary permits and licenses. As such, this tool will only be utilized for fundraising and non-profit related activities."
            />
          )}
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signin" variant="body2">
                    {"Have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
        </Box>
      </Container>
    {/* AlertDialog */}
    {showAlertDialog && isFormSubmitted && !checkboxChecked && (
      <AlertDialog
        open={true}
        buttonText="OK"
        dialogTitle="Error Signing Up"
        dialogContent="Please fill out all required information"
        onAgree={() => setShowAlertDialog(false)}
      />
    )}
    </ThemeProvider>
  );
}
