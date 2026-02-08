import { useState } from "react";
import { Box, Container, Tab, Tabs, Typography, Paper, Stack } from "@mui/material";
import AdminTab from "../features/admin/adminTab";
import UserTab from "../features/users/userTab";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Dashboard() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f1f5f9' }}>
      <Box sx={{ background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)', pt: 6, pb: 14 }}>
        <Container maxWidth="lg">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ p: 1, bgcolor: '#3b82f6', borderRadius: 2, color: 'white' }}>
                <Typography variant="h5">⚡️</Typography>
              </Box>
              <Box>
                <Typography variant="h4" fontWeight="800" color="white">User Portal</Typography>
                <Typography variant="body2" color="rgba(255,255,255,0.6)">Store and manage user details</Typography>
              </Box>
            </Box>
            <Paper sx={{ borderRadius: '50px', p: 0.5, bgcolor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(5px)' }}>
              <Tabs value={tabIndex} onChange={(_, v) => setTabIndex(v)} sx={{
                '& .MuiTabs-indicator': { display: 'none' },
                '& .MuiTab-root': {
                  color: 'white', borderRadius: '50px', minHeight: '40px', px: 4,
                  '&.Mui-selected': { background: 'linear-gradient(45deg, #3b82f6, #2563eb)', color: 'white' }
                }
              }}>
                <Tab icon={<PeopleIcon sx={{ mr: 1 }} />} iconPosition="start" label="Users" />
                <Tab icon={<SettingsIcon sx={{ mr: 1 }} />} iconPosition="start" label="Admin" />
              </Tabs>
            </Paper>
          </Stack>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ mt: -8 }}>
        {tabIndex === 0 ? <UserTab /> : <AdminTab />}
      </Container>
    </Box>
  );
}