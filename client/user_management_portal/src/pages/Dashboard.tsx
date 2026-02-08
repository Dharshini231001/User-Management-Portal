import { useState } from "react";
import { Box, Container, Tab, Tabs, Typography, Paper } from "@mui/material";
import AdminTab from "../features/admin/adminTab";
import UserTab from "../features/users/userTab";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";

export default function Dashboard() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F3F4F6', pb: 8 }}>
      <Box sx={{ 
        background: 'linear-gradient(180deg, #DBEAFE 0%, #F3F4F6 100%)', 
        pt: 6, pb: 10, px: 2 
      }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <Box sx={{ 
              width: 50, height: 50, bgcolor: 'primary.main', borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
            }}>
              <Typography variant="h4">⚡️</Typography>
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="800" color="text.primary">
                User Portal
              </Typography>
              <Typography color="text.secondary">
                Configure dynamic fields and manage users details
              </Typography>
            </Box>
          </Box>

          <Paper sx={{ 
            borderRadius: '50px', 
            display: 'inline-flex', 
            p: 0.5, 
            bgcolor: 'white' 
          }}>
            <Tabs 
              value={tabIndex} 
              onChange={handleTabChange} 
              variant="fullWidth"
              sx={{
                '& .MuiTab-root': {
                  borderRadius: '50px',
                  minHeight: '48px',
                  px: 4,
                  transition: 'all 0.2s',
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'white',
                    boxShadow: '0px 2px 10px rgba(59, 130, 246, 0.3)'
                  }
                }
              }}
            >
              <Tab icon={<SettingsIcon sx={{ mb: 0, mr: 1 }} />} iconPosition="start" label="Admin" />
              <Tab icon={<PeopleIcon sx={{ mb: 0, mr: 1 }} />} iconPosition="start" label="Users" />
            </Tabs>
          </Paper>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ mt: -6 }}>
        {tabIndex === 0 ? <AdminTab /> : <UserTab />}
      </Container>
    </Box>
  );
}