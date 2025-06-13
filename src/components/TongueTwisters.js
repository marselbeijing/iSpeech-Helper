import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  useTheme,
  Tabs,
  Tab,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { playSound } from '../services/sound';
import { vibrate } from '../services/vibration';
import { updateProgress } from '../services/storage';
import { useTranslation } from 'react-i18next';

const tongueTwistersRU = {
  beginner: [
    'Шла Саша по шоссе и сосала сушку.',
    'Карл у Клары украл кораллы, а Клара у Карла украла кларнет.',
    'На дворе трава, на траве дрова.',
    'От топота копыт пыль по полю летит.',
    'У четырёх черепах четыре черепашонка.',
    'Повар Пётр пёк пироги.',
    'Кукушка кукушонку купила капюшон.',
    'Тридцать три корабля лавировали, лавировали, да не вылавировали.',
    'Сшит колпак не по-колпаковски, вылит колокол не по-колоколовски.',
    'Петя пел, пел, да не допел.',
    'У ежа ежата, у ужа ужата.',
    'У перепёлки перепёлята.',
    'Везёт Сенька Соньку на санках.',
    'Сеня с Соней везут Саню на санках.',
    'Саша шёл по шоссе и сосал сушку.',
    'Мама мыла Милу мылом, Мила мыло не любила.',
    'Бык тупогуб, тупогубенький бычок.',
    'Водовоз вёз воду из водопровода.',
    'Дятел дуб долбил, да не додолбил.',
    'Ехал Грека через реку.'
  ],
  advanced: [
    'В недрах тундры выдры в гетрах тырят в вёдра ядра кедров.',
    'Шестнадцать шестёрок шестерили, шестерили, да не вышестерили.',
    'Ушёл косой козёл с козой, козой косой козёл косой.',
    'Шесть мышат в камышах шуршат, а шустрый шмель над шиповником шумно жужжит.',
    'Цапля чахла, цапля сохла, цапля сдохла.',
    'Ткет ткач ткани на платки Тане.',
    'Расскажите про покупки. Про какие про покупки? Про покупки, про покупки, про покупочки свои.',
    'Яшма в замше замшела, замша в яшме заушмела.',
    'Чукча в чуме чистит чуни. Чистота у чукчи в чуме.',
    'На дворе растёт трава, на траве стоят дрова.',
    'Брейте бороду бобру - будет браво бобр бодаться.',
    'Пастух пасёт пастбище, пастбище пастух пасёт.',
    'Плотник Павел плотит плот, плотит плот, да не выплотит.',
    'Пирожки у Петра, пироги у Павла.',
    'Лиса Лариса ловко ловила лягушек.',
    'Всех скороговорок не перескороговоришь, не перевыскороговоришь.',
    'Рыла свинья белорыла, тупорыла; полдвора рылом изрыла, вырыла, подрыла.',
    'Говорил командир про полковника и про полковницу, про подполковника и про подполковницу.',
    'Стоит поп на копне, колпак на попе, копна под попом, поп под колпаком.',
    'Около кола колокола, около ворот коловорот.'
  ],
  master: [
    'В четверг четвёртого числа в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж. Чертёж был чересчур черноват, чертёнок чертыхался, чертил чертёж до черноты в глазах.',
    'В недрах тундры выдры в гетрах тырят в вёдра ядра кедров. Выдрав с выдры в тундре гетры, вытру выдрой ядра кедров, вытру гетрой выдре морду — ядра в вёдра, выдра в тундру. Всё это происходило в тёмных недрах тундры, где выдры в гетрах не ведают бедра.',
    'Протокол про протокол протоколом запротоколировали. Регулировщик лигуриец регулировал в Лигурии. Деидеологизировали-деидеологизировали, и додеидеологизировались. Всё это происходило на лигурийском вокзале, где лигурийский регулировщик регулировал лигурийский поезд.',
    'Шестнадцать шестёрок шестерили, шестерили, да не вышестерили. Шестнадцать шестёрок шестерёнок шуршали, шуршали, да не вышуршали. Шестнадцать шестёрок шестерёнок шуршали в шестнадцати шестерёнчатых часах.',
    'Сшит колпак не по-колпаковски, вылит колокол не по-колоколовски. Надо колпак переколпаковать, перевыколпаковать, надо колокол переколоколовать, перевыколоколовать. Колпаковский колпак переколпакован, колоколовский колокол переколоколован.',
    'У перепела и перепелки пять перепелят в перелеске прелом прыгали и пели. Перепел перепелке, перепелка перепелу, перепелята перепелу и перепелке - перепел, перепелка, перепелята - перепелиное семейство. Перепел перепелку перепел, перепелка перепела перепела.',
    'Тридцать три корабля лавировали, лавировали, да не вылавировали. Все храбрые хорваты хотят в хоровод. Тридцать три корабля лавировали по волнам, да не вылавировали, а хорваты в хороводе хорохорились.',
    'Четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж. Чернила были чересчур чернильные, чертёж был чересчур черноват, чертёнок чертыхался, чертил чертёж до черноты в глазах.',
    'Семьсот семьдесят семь всех скороговорок перескороговорили, перевыскороговорили. Семьсот семьдесят семь скороговорщиков перескороговорили, перевыскороговорили скороговорки.',
    'Сорок сорок сороковок совали сорокам в сороковые сорочки. Сорок сорок сороковок совали сорокам в сороковые сорочки сорок раз.',
    'Десять девочек-девчонок делили дыню на двоих. Девять девочек-девчонок делили дыню на девятерых. Дыня делилась, да не поделилась.',
    'Пастух пасёт пастбище, пастбище пастух пасёт. Пастух пасёт пастбище, пастбище пастух пасёт, пастух пастбище не выпасёт, пока пастбище пастух пасёт.',
    'Плотник Павел плотит плот, плотит плот, да не выплотит. Плотник Павел плотит плот, плотит плот, да не выплотит, пока плот не выплотит.',
    'Пирожки у Петра, пироги у Павла. Пирожки у Петра, пироги у Павла, пирожки у Петра, пироги у Павла, пирожки у Петра, пироги у Павла.',
    'Лиса Лариса ловко ловила лягушек. Лиса Лариса ловко ловила лягушек, ловко ловила лягушек, ловко ловила лягушек, ловко ловила лягушек.',
    'На дворе трава, на траве дрова, не руби дрова на траве двора. На дворе трава, на траве дрова, не руби дрова на траве двора. На дворе трава, на траве дрова, не руби дрова на траве двора.',
    'Карл у Клары украл кораллы, Клара у Карла украла кларнет. Если бы Карл у Клары не крал кораллы, то Клара у Карла не крала б кларнет.',
    'Королева кавалеру каравеллу подарила. Кавалер королеве карамельку подарил. Карамелька каравеллы стоит, а каравелла карамельки не стоит.',
    'Бомбардир бонбоньерками бомбардировал барышень, барышни бомбардира бонбоньерками бомбардировали.',
    'Маланья-болтунья молоко болтала, выбалтывала, да не выболтала.'
  ]
};

const tongueTwistersEN = {
  beginner: [
    "She sells seashells by the seashore.",
    "Peter Piper picked a peck of pickled peppers.",
    "Red lorry, yellow lorry.",
    "Fuzzy Wuzzy was a bear.",
    "I scream, you scream, we all scream for ice cream.",
    "A proper copper coffee pot.",
    "Three free throws.",
    "Unique New York.",
    "Fresh fried fish.",
    "She sees cheese.",
    "Toy boat, toy boat, toy boat.",
    "Blue blood, bad blood.",
    "Clean clams crammed in clean cans.",
    "Six slick slim sycamore saplings.",
    "Five fat friars frying flat fish.",
    "Four fine fresh fish for you.",
    "Nine nice night nurses nursing nicely.",
    "Thin things think thick thoughts.",
    "Two tiny tigers take two taxis to town.",
    "We surely shall see the sun shine soon."
  ],
  advanced: [
    "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
    "Betty Botter bought some butter but she said this butter's bitter.",
    "If a dog chews shoes, whose shoes does he choose?",
    "I thought I thought of thinking of thanking you.",
    "I wish to wash my Irish wristwatch.",
    "Near an ear, a nearer ear, a nearly eerie ear.",
    "Which wristwatches are Swiss wristwatches?",
    "Fred fed Ted bread, and Ted fed Fred bread.",
    "I slit the sheet, the sheet I slit, and on the slitted sheet I sit.",
    "Six sticky skeletons.",
    "Wayne went to wales to watch walruses.",
    "Lesser leather never weathered wetter weather better.",
    "A big black bug bit a big black bear.",
    "How can a clam cram in a clean cream can?",
    "Eddie edited it.",
    "Thirty-three thieves thought that they thrilled the throne throughout Thursday.",
    "Two tried and true tridents.",
    "Six Swiss switch witches watching Swiss watch switches.",
    "Stupid superstition!",
    "She stood upon her balcony, inexplicably mimicking him hiccuping, and amicably welcoming him in."
  ],
  master: [
    "Peter Piper picked a peck of pickled peppers. A peck of pickled peppers Peter Piper picked. If Peter Piper picked a peck of pickled peppers, where's the peck of pickled peppers Peter Piper picked?",
    "Betty Botter bought some butter, but she said, \"This butter's bitter. If I put it in my batter, it will make my batter bitter. But a bit of better butter will make my batter better.\" So she bought a bit of butter better than her bitter butter, and she put it in her batter and the batter was not bitter.",
    "How much wood would a woodchuck chuck if a woodchuck could chuck wood? He would chuck, he would, as much as he could, and chuck as much wood as a woodchuck would if a woodchuck could chuck wood.",
    "She sells seashells by the seashore. The shells she sells are surely seashells. So if she sells shells on the seashore, I'm sure she sells seashore shells.",
    "I scream, you scream, we all scream for ice cream. When we all scream for ice cream, what do we all scream? We all scream, \"Ice cream!\"",
    "If you must cross a course cross cow across a crowded cow crossing, cross the cross coarse cow across the crowded cow crossing carefully.",
    "Fuzzy Wuzzy was a bear. Fuzzy Wuzzy had no hair. Fuzzy Wuzzy wasn't fuzzy, was he?",
    "To begin to toboggan first buy a toboggan, but don't buy too big a toboggan. Too big a toboggan is too big a toboggan to buy to begin to toboggan.",
    "A proper copper coffee pot. A proper copper coffee pot. A proper copper coffee pot.",
    "Can you can a can as a canner can can a can?",
    "Six slick slim sycamore saplings. Six slick slim sycamore saplings. Six slick slim sycamore saplings.",
    "Thirty-three thousand feathers fluttered from thirty-three thousand turkeys.",
    "Round and round the rugged rocks the ragged rascal ran.",
    "Black background, brown background, black background, brown background.",
    "The sixth sick sheikh's sixth sheep's sick. The sixth sick sheikh's sixth sheep's sick.",
    "Mrs. Smith's Fish Sauce Shop sells fish sauce, but the fish sauce shop Mrs. Smith's Fish Sauce Shop sells smells like fish sauce from a fish sauce shop.",
    "I have got a date at a quarter to eight; I'll see you at the gate, so don't be late. Because I have got a date at a quarter to eight.",
    "If you stick a stock of liquor in your locker it is slick to stick a lock upon your stock or some joker who is slicker is going to trick you of your liquor if you fail to lock your liquor with a lock.",
    "A skunk sat on a stump and thunk the stump stunk, but the stump thunk the skunk stunk.",
    "Through three cheese trees three free fleas flew. While these fleas flew, freezy breeze blew. Freezy breeze made these three trees freeze. Freezy trees made these trees' cheese freeze. That's what made these three free fleas sneeze."
  ]
};

const levels = [
  { label: 'Beginner', labelRu: 'Новичок', value: 'beginner' },
  { label: 'Advanced', labelRu: 'Продвинутый', value: 'advanced' },
  { label: 'Master', labelRu: 'Мастер', value: 'master' },
];

const TongueTwisters = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const [level, setLevel] = useState('beginner');
  const [currentTwister, setCurrentTwister] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const textBoxRef = useRef(null);

  useEffect(() => {
    getRandomTwister(level);
  }, [level, i18n.language]);

  const getRandomTwister = (lvl = level) => {
    setIsVisible(false);
    setTimeout(() => {
      const arr = i18n.language === 'ru' ? tongueTwistersRU[lvl] : tongueTwistersEN[lvl];
      const randomIndex = Math.floor(Math.random() * arr.length);
      setCurrentTwister(arr[randomIndex]);
      setIsVisible(true);
      playSound('click');
      vibrate('click');
      handleExerciseComplete();
      setTimeout(() => {
        if (textBoxRef.current) {
          textBoxRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 350);
    }, 300);
  };

  const handleBackClick = () => {
    playSound('click');
    vibrate('click');
    window.history.back();
  };

  const handleExerciseComplete = () => {
    updateProgress('tongueTwister');
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
      backgroundColor: theme.palette.background.default,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Container maxWidth="sm" sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        p: { xs: 0, sm: 0 },
        width: '100%',
        maxWidth: '100%'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Box
            sx={{
              p: { xs: 1.5, sm: 2 },
              borderRadius: { xs: 0, sm: 3 },
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' 
                : 'linear-gradient(135deg, #fffefb 0%, #fffde4 100%)',
              border: 'none',
              width: '100%',
              height: '100%',
              maxHeight: '100vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                width: '100%',
                background: 'linear-gradient(90deg, #2196f3 0%, #1e88e5 100%)',
                borderRadius: 2,
                mb: { xs: 1, sm: 2 },
                py: { xs: 1.5, sm: 2 },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)',
                px: 2
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
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  width: '100%',
                  textAlign: 'center'
                }}
              >
                {i18n.language === 'ru' ? 'Скороговорки' : 'Tongue Twisters'}
              </Typography>
            </Box>
            <Tabs
              value={level}
              onChange={(_, v) => setLevel(v)}
              variant="fullWidth"
              sx={{ mb: { xs: 1, sm: 2 }, width: '100%' }}
            >
              {levels.map(l => (
                <Tab 
                  key={l.value} 
                  value={l.value} 
                  label={i18n.language === 'ru' ? l.labelRu : l.label} 
                  sx={{ fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' } }} 
                />
              ))}
            </Tabs>
            
            <Box sx={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: 0, p: { xs: 1, sm: 2 } }}>
              <Box
                sx={{
                  p: { xs: 1, sm: 1.5 },
                  borderRadius: 4,
                  background: theme.palette.mode === 'dark' ? '#2d2d2d' : '#fff',
                  boxShadow: theme.palette.mode === 'dark' 
                    ? '0 4px 24px 0 rgba(0,0,0,0.3)' 
                    : '0 4px 24px 0 rgba(60,60,120,0.10)',
                  fontSize: { xs: 14, sm: 15 },
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
                  maxHeight: { xs: '40vh', sm: 180 },
                  overflowY: 'auto',
                  width: '100%',
                  margin: '0 auto',
                  maxWidth: 520,
                  userSelect: 'none',
                  letterSpacing: '-0.01em',
                  wordBreak: 'break-word',
                }}
                ref={textBoxRef}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.97 }}
                  transition={{ duration: 0.3 }}
                  style={{ width: '100%' }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.text.primary,
                      textAlign: 'center',
                      fontWeight: 500,
                      fontSize: '1.1rem',
                      lineHeight: 1.6,
                      wordBreak: 'break-word',
                      whiteSpace: 'pre-line',
                      m: 0,
                    }}
                  >
                    {currentTwister}
                  </Typography>
                </motion.div>
              </Box>
            </Box>

            <Typography
              variant="caption"
              align="center"
              sx={{ 
                mb: { xs: 1, sm: 2 }, 
                mt: { xs: 1, sm: 2 }, 
                display: 'block', 
                color: theme.palette.text.primary, 
                fontWeight: 500,
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              }}
            >
              {i18n.language === 'ru' 
                ? 'Тренируйте дикцию и артикуляцию, повторяя скороговорки вслух.'
                : 'Practice your diction and articulation by repeating tongue twisters out loud.'}
              <br /><br />
              {i18n.language === 'ru'
                ? 'Повторите 3–5 раз, стараясь не сбиваться с ритма.'
                : 'Repeat 3-5 times, trying to maintain the rhythm.'}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, sm: 1.5 }, width: '100%', mb: { xs: 8, sm: 2 } }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => getRandomTwister()}
                sx={{
                  py: { xs: 0.75, sm: 1 },
                  px: { xs: 2, sm: 2.5 },
                  borderRadius: 30,
                  fontWeight: 500,
                  fontSize: { xs: '0.875rem', sm: '0.95rem' },
                  minWidth: 0,
                  width: 'auto',
                  alignSelf: 'center',
                  backgroundColor: '#ff3366',
                  '&:hover': {
                    backgroundColor: '#e0294d',
                  },
                }}
              >
                {i18n.language === 'ru' ? 'Случайная скороговорка' : 'Random Tongue Twister'}
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ArrowBack />}
                onClick={handleBackClick}
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
                Back
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default TongueTwisters; 