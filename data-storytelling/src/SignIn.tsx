import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { supabase } from './supabaseClient';
import TabPanel from './components/TabPanel'; 
import { useNavigate } from 'react-router-dom';
import { Tab, Tabs } from '@mui/material';
import AlertDialog from './components/AlertDialog';

/**
 * SignIn Component
 *
 * A React component for user sign-in using Material-UI.
 * It includes form fields for email, password, and user type.
 * The user type is chosen between 'Buyer' and 'Organization' using tabs.
 * An AlertDialog is displayed if the form is submitted without filling required information or on sign-in error.
 * After a successful sign-in, it fetches user data based on user type and redirects to the appropriate dashboard.
 *
 * @component
 * @example
 * // Usage in another component or file
 * import SignIn from './SignIn';
 * // ... other imports
 *
 * const MyComponent = () => {
 *   return (
 *     <SignIn />
 *   );
 * }
 */

const defaultTheme = createTheme();


export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('buyer'); // Default userType is set to 'buyer'
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); 
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    setIsFormSubmitted(true); // Set form submission to true

    if (!email || !password) {
      setShowAlertDialog(true);
      return;
    }

    // Perform sign-in logic using Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      // Handle sign-in error
      setShowAlertDialog(true);
    } else {
      // Assuming user_type is a field in the user's data table
    const { data: userData, error: userError } = await supabase
    .from(data.user.user_metadata.user_type === 'org' ? 'admin' : 'buyers')
    .select('*')
    .eq('id', data.user.id)
    .single();

    if (userError) {
    // Handle error fetching user data
    console.error('Error fetching user data:', userError);
    } else {
    // Check user type and redirect
    if (userData) {
      if (data.user.user_metadata.user_type === 'org') {
        // Redirect to organization dashboard
        navigate('/dashboard');
      } else {
        // Redirect to buyer dashboard
        navigate('/buyer-dashboard');
      }
    } else {
      console.error('User data not found:', data.user.id);
  }
}
    }

    // Handle sign-in success or error
    if (error) {
      console.log(error);
    } else {
      navigate('/');
    }
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
            Sign In
          </Typography>

          <Box sx={{ mt: 2 }}>
            {/* Two tabs to switch between 'Buyer' and 'Organization' forms */}
            <Tabs value={userType} onChange={() => handleUserTypeChange(userType === 'buyer' ? 'org' : 'buyer')} centered>
              <Tab label="Buyer" value="buyer" />
              <Tab label="Organization" value="org" />
            </Tabs>
          </Box>

          {/* TabPanel for Sign In */}
          <TabPanel userType={userType} index={0} value={0}>
          <Box component="form" onSubmit={handleSignIn} noValidate sx={{ mt: 1 }}>
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
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          </TabPanel>
        </Box>
      </Container>
      {/* AlertDialog */}
    {showAlertDialog && isFormSubmitted ? (
    <AlertDialog
      open={true}
      buttonText="OK"
      dialogTitle="Error Signing Up"
      dialogContent="Email and password are required."
      onAgree={() => setShowAlertDialog(false)}
    />
  ) : null}
    </ThemeProvider>
  );
}
