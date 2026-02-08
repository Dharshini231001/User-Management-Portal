import { Box, Button, Typography, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{
      height: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <Container maxWidth="md">
        <Stack spacing={4} alignItems="center" textAlign="center" sx={{
          p: { xs: 4, md: 8 }, borderRadius: 8,
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
          <Box sx={{ 
            p: 2, borderRadius: 4, 
            background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)'
          }}>
             <Typography variant="h3" color="white">⚡️</Typography>
          </Box>
          <Box>
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 900, color: 'white', letterSpacing: '-0.02em' }}>
              User <span style={{ background: 'linear-gradient(to right, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Portal</span>
            </Typography>
            <Typography variant="h6" sx={{ color: '#94a3b8', maxWidth: 500, fontWeight: 400 }}>
              Manage user details and Configure dynamic fields
            </Typography>
          </Box>
          <Button 
            variant="contained" size="large" endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/dashboard')}
            sx={{ 
              px: 6, py: 2, borderRadius: '100px', fontSize: '1.1rem', textTransform: 'none',
              background: 'linear-gradient(45deg, #2563eb, #7c3aed)',
              '&:hover': { background: 'linear-gradient(45deg, #1d4ed8, #6d28d9)', transform: 'translateY(-2px)' },
              transition: 'all 0.3s ease'
            }}
          >
            Enter Dashboard
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}