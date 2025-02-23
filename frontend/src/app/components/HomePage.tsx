'use client';
import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';

const Homepage = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        color: 'black',
        height: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="xl" sx={{ 
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <Typography variant="h2" sx={{ fontWeight: 'bold', fontSize: '4rem' }}>
          Human Stories & Ideas
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          A place to read, write, and deepen your understanding
        </Typography>
        <Button 
          sx={{ mt: 4}} 
              >
          <Link
              href="/sign-up"
              className="flex items-center space-x-2 bg-black text-white rounded-full py-2 px-4 no-underline hover:text-white hover:bg-gray-800 focus:text-white hover:no-underline focus:no-underline"
            >
              Start Reading
            </Link>                 
        </Button>
      </Container>
    </Box>
  );
};

export default Homepage;
