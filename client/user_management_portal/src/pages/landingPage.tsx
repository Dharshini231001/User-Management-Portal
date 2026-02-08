import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{
      height: '100vh',
      background: 'linear-gradient(135deg, #E0F2FE 0%, #FFFFFF 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      textAlign: 'center'
    }}>
      <Container maxWidth="sm">
        <Box sx={{ mb: 4, display: 'inline-block', p: 2, borderRadius: 4, bgcolor: 'primary.main', boxShadow: 3 }}>
           <Typography variant="h3" color="white" fontWeight="bold">⚡️</Typography>
        </Box>
        <Typography variant="h2" gutterBottom fontWeight="800" color="text.primary">
          User Portal
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 6 }}>
          Configure dynamic fields and manage users details.
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate('/dashboard')}
          sx={{ px: 5, py: 1.5, fontSize: '1.2rem', borderRadius: '50px' }}
        >
          Get Started
        </Button>
      </Container>
    </Box>
  );
}