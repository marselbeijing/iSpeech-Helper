import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Box,
  Slider,
  Paper,
  useTheme,
  Button,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  ArrowBack,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { playSound } from '../services/sound';
import { vibrate } from '../services/vibration';
import { styled } from '@mui/material/styles';
import { updateProgress } from '../services/storage';
import { useTranslation } from 'react-i18next';

// Кастомный шарик для Slider
const CustomThumb = styled('span')(({ theme, ownerState }) => ({
  width: 24,
  height: 24,
  backgroundColor: '#29b6f6',
  borderRadius: '50%',
  boxShadow: '0 2px 8px 0 #2196f355',
  border: '3px solid #fff',
  display: 'block',
  position: 'absolute',
  top: '50%',
  left: 0,
  transform: 'translateY(-50%)',
}));

const MetronomeReader = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(60);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [longAffirmation, setLongAffirmation] = useState('');
  const [words, setWords] = useState([]);
  const audioContextRef = useRef(null);
  const nextNoteTimeRef = useRef(0);
  const scheduledNotesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const wordsRef = useRef([]);
  const textBoxRef = useRef(null);
  const lastActiveRef = useRef(null);

  const handleGenerateAffirmation = () => {
    const affirmationKeys = Array.from({length: 25}, (_, i) => `affirmation_${i + 1}`);
    const randomKey = affirmationKeys[Math.floor(Math.random() * affirmationKeys.length)];
    const affirmation = t(randomKey);
    setLongAffirmation(affirmation);
    const splitWords = affirmation.split(/\s+/).filter(word => word.length > 0);
    setWords(splitWords);
    wordsRef.current = splitWords;
    setCurrentWordIndex(-1);
    setIsPlaying(false);
  };

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    handleGenerateAffirmation();
    return () => {
      if (audioContextRef.current) audioContextRef.current.close();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [t]);

  useEffect(() => {
    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(scheduler);
    } else {
      cancelAnimationFrame(animationFrameRef.current);
      setCurrentWordIndex(-1);
      setTimeout(() => {
        if (textBoxRef.current) {
          textBoxRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 350);
    }
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [isPlaying, bpm, words.length]);

  useEffect(() => {
    if (lastActiveRef.current && textBoxRef.current) {
      const el = lastActiveRef.current;
      const box = textBoxRef.current;
      const elRect = el.getBoundingClientRect();
      const boxRect = box.getBoundingClientRect();
      if (elRect.bottom > boxRect.bottom - 8) {
        el.scrollIntoView({ block: 'end', behavior: 'smooth' });
      }
    }
  }, [currentWordIndex]);

  const scheduleNote = (time) => {
    const osc = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    osc.frequency.value = 1000;
    gainNode.gain.value = 0.5;
    osc.start(time);
    osc.stop(time + 0.1);
    scheduledNotesRef.current.push({ osc, gainNode, time });
    scheduledNotesRef.current = scheduledNotesRef.current.filter(note => note.time > time - 0.5);
  };

  const scheduler = () => {
    const currentTime = audioContextRef.current.currentTime;
    while (nextNoteTimeRef.current < currentTime + 0.1) {
      scheduleNote(nextNoteTimeRef.current);
      nextNoteTimeRef.current += 60.0 / bpm;
      if (isPlaying && words.length > 0) {
        setCurrentWordIndex(prev => {
          if (prev === -1) return 0;
          if (prev + 1 >= words.length) return 0;
          return prev + 1;
        });
      }
    }
    animationFrameRef.current = requestAnimationFrame(scheduler);
  };

  const handlePlayPause = () => {
    if (!longAffirmation) return;
    if (!isPlaying) {
      if (audioContextRef.current.state === 'suspended') audioContextRef.current.resume();
      nextNoteTimeRef.current = audioContextRef.current.currentTime;
      scheduler();
      setIsPlaying(true);
      playSound('click');
      vibrate('click');
    } else {
      cancelAnimationFrame(animationFrameRef.current);
      setIsPlaying(false);
      playSound('click');
      vibrate('click');
      handleExerciseComplete();
    }
  };

  const handleBpmChange = (event, newValue) => {
    if (typeof newValue === 'number') {
      setBpm(newValue);
      playSound('click');
      vibrate('click');
    }
  };

  const handleExerciseComplete = () => {
    updateProgress('metronome');
  };

  return (
    <Box sx={{ 
      height: '100vh', 
      width: '100%', 
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.palette.background.default
    }}>
      <Container maxWidth="sm" sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        p: { xs: 0, sm: 2 }
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', height: '100%' }}
        >
          <Box
            sx={{
              p: { xs: 1.5, sm: 2 },
              borderRadius: { xs: 0, sm: 3 },
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' 
                : 'linear-gradient(135deg, #fffefb 0%, #fffde4 100%)',
              border: { xs: 'none', sm: `1px solid ${theme.palette.divider}` },
              mb: { xs: 0, sm: 3 },
              width: '100%',
              maxWidth: '100%',
              minWidth: '280px',
              height: { xs: '100vh', sm: 'auto' },
              minHeight: { xs: '100vh', sm: '540px' },
              maxHeight: { xs: '100vh', sm: '700px' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              mx: 'auto',
            }}
          >
            <Box
              sx={{
                width: '100%',
                background: 'linear-gradient(90deg, #2196f3 0%, #1e88e5 100%)',
                borderRadius: 2,
                mb: 2,
                py: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)',
              }}
            >
              <Typography 
                variant="h5" 
                align="center" 
                sx={{ 
                  color: '#fff',
                  fontWeight: 'bold',
                  textShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  m: 0,
                }}
              >
                {t('metronome')}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              align="center"
              sx={{ mb: 2, color: 'text.primary' }}
            >
              {t('metronome_instruction')}
            </Typography>

            <Box sx={{ mb: 0.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="caption" color="text.secondary"></Typography>
              <Typography variant="caption" sx={{ fontWeight: 500 }}>{t('tempo_bpm')}:</Typography>
              <Typography variant="caption" color="text.secondary"></Typography>
            </Box>
            <Slider
              value={bpm}
              min={40}
              max={160}
              step={1}
              onChange={handleBpmChange}
              sx={{
                mb: 2,
                mx: 'auto',
                width: '90%',
                py: 2,
                '& .MuiSlider-rail': {
                  height: 6,
                  borderRadius: 3,
                },
                '& .MuiSlider-track': {
                  height: 6,
                  borderRadius: 3,
                },
              }}
              valueLabelDisplay="auto"
              slots={{ thumb: CustomThumb }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: isPlaying ? 1.08 : 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Button
                  onClick={handlePlayPause}
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    minWidth: 0,
                    boxShadow: '0 2px 12px 0 #ff3366a0',
                    background: 'linear-gradient(135deg, #ff3366 0%, #ff5e62 100%)',
                    color: '#fff',
                    fontSize: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #ff5e62 0%, #ff3366 100%)',
                      boxShadow: '0 4px 16px 0 #ff3366a0',
                    },
                  }}
                >
                  {isPlaying ? <Pause fontSize="inherit" /> : <PlayArrow fontSize="inherit" />}
                </Button>
              </motion.div>
            </Box>
            
            {words.length > 0 && (
              <Box
                sx={{
                  p: 1.5,
                  mb: 3,
                  borderRadius: 4,
                  background: theme.palette.mode === 'dark' ? '#2d2d2d' : '#fff',
                  boxShadow: theme.palette.mode === 'dark' 
                    ? '0 4px 24px 0 rgba(0,0,0,0.3)' 
                    : '0 4px 24px 0 rgba(60,60,120,0.10)',
                  fontSize: 15,
                  color: theme.palette.text.primary,
                  fontWeight: 500,
                  textAlign: 'center',
                  minHeight: 40,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 0.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  lineHeight: 1.5,
                  maxHeight: 180,
                  overflowY: 'auto',
                  userSelect: 'none',
                  letterSpacing: '-0.01em',
                  wordBreak: 'break-word',
                }}
                ref={textBoxRef}
              >
                {words.map((word, idx) => {
                  const isActive = idx === currentWordIndex;
                  return (
                    <span
                      key={idx}
                      style={{
                        background: isActive ? 'rgba(33,150,243,0.18)' : 'transparent',
                        color: isActive ? '#1976d2' : theme.palette.text.primary,
                        borderRadius: isActive ? 5 : 0,
                        padding: '1px 4px',
                        margin: '0 0.5px',
                        fontWeight: 500,
                        transition: 'background 0.2s, color 0.4s cubic-bezier(0.4,0,0.2,1)',
                        fontSize: 15,
                        wordBreak: 'break-word',
                        whiteSpace: 'pre-line',
                        boxShadow: isActive ? '0 2px 8px 0 #2196f355' : 'none',
                      }}
                      ref={isActive ? lastActiveRef : null}
                    >
                      {word}
                    </span>
                  );
                })}
              </Box>
            )}
            
            <Typography
              variant="caption"
              align="center"
              sx={{ mb: 2, display: 'block', color: theme.palette.text.primary, fontWeight: 500 }}
            >
              {t('metronome_repeat')}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, width: '100%', mt: 1 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGenerateAffirmation}
                sx={{
                  py: 1,
                  px: 2.5,
                  borderRadius: 30,
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  minWidth: 0,
                  width: 'auto',
                  alignSelf: 'center',
                  backgroundColor: '#ff3366',
                  '&:hover': {
                    backgroundColor: '#e0294d',
                  },
                }}
              >
                {t('generate_affirmation')}
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ArrowBack />}
                onClick={() => window.history.back()}
                sx={{
                  py: 1,
                  px: 2.5,
                  borderRadius: 30,
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  minWidth: 0,
                  width: 'auto',
                  alignSelf: 'center',
                  backgroundColor: '#ff3366',
                  '&:hover': {
                    backgroundColor: '#e0294d',
                  },
                  mt: 3,
                  mb: 1,
                }}
              >
                Назад
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default MetronomeReader; 