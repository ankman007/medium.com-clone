'use client';
import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';

const Homepage = () => {
  return (
    <Box sx={{ backgroundColor: 'white', color: 'black', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
      <Container>
        <Typography variant="h2" sx={{ fontWeight: 'bold', fontSize: '4rem' }}>
          Human Stories & Ideas
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          A place to read, write, and deepen your understanding
        </Typography>
        <Button 
          variant="contained" 
          sx={{ mt: 4, backgroundColor: 'white', color: '#1e0070' }} 
              >
                <Link href="/sign-up">Start Reading</Link>                  
        </Button>
      </Container>
    </Box>
  );
};

export default Homepage;
