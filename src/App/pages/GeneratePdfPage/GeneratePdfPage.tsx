import React, { useState } from 'react';
import Header from '@components/Header';
import { PDFDownloadLink, Document, Page, Text, Image, View, StyleSheet, Font } from '@react-pdf/renderer';

import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  FormHelperText,
} from '@mui/material';

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 12,
  },
});

interface MyDocumentProps {
  name: string;
  age: string;
  gender: string;
  picture: string;
}

const MyDocument: React.FC<MyDocumentProps> = ({ name, age, gender, picture }) => (
  <Document>
    <Page size="A4" style={styles.page} wrap>
      <View style={styles.section}>
        <Text style={styles.text}>Имя: {name}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Возраст: {age}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Пол: {gender}</Text>
      </View>
      <View style={styles.section}>{picture && <Image src={picture} />}</View>
    </Page>
  </Document>
);

const GeneratePdfPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPdfLink, setShowPdfLink] = useState<boolean>(false);
  const [pdfDocument, setPdfDocument] = useState<JSX.Element | null>(null);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setErrors((prev) => ({ ...prev, name: '' }));
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setAge(value);
      setErrors((prev) => ({ ...prev, age: '' }));
    }
  };

  const handleGenderChange = (event: SelectChangeEvent<string>) => {
    setGender(event.target.value as string);
    setErrors((prev) => ({ ...prev, gender: '' }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    setErrors((prev) => ({ ...prev, image: '' }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name) newErrors.name = 'Имя обязательно';
    if (!age) newErrors.age = 'Возраст обязателен';
    if (!gender) newErrors.gender = 'Пол обязателен';
    if (!image) newErrors.image = 'Изображение обязательно';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleGeneratePdf = () => {
    if (validateForm()) {
      setPdfDocument(<MyDocument name={name} age={age} gender={gender} picture={imageUrl} />);
      setShowPdfLink(true);
    } else {
      setShowPdfLink(false);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Typography variant="h4" gutterBottom>
          PDF Generator Form
        </Typography>
        <TextField
          label="Имя"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={handleTextChange}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Возраст"
          variant="outlined"
          fullWidth
          margin="normal"
          value={age}
          onChange={handleAgeChange}
          error={!!errors.age}
          helperText={errors.age}
        />
        <FormControl variant="outlined" fullWidth margin="normal" error={!!errors.gender}>
          <InputLabel id="gender-label">Пол</InputLabel>
          <Select labelId="gender-label" value={gender} onChange={handleGenderChange} label="Пол">
            <MenuItem value="Мужской">Мужской</MenuItem>
            <MenuItem value="Женский">Женский</MenuItem>
          </Select>
          {!!errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
        </FormControl>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span">
            Загрузить изображение
          </Button>
        </label>
        {image && <Typography variant="body1">{image.name}</Typography>}
        {!!errors.image && <Typography color="error">{errors.image}</Typography>}
        <Button variant="contained" color="primary" onClick={handleGeneratePdf}>
          Сгенерировать PDF
        </Button>
        {showPdfLink && pdfDocument && (
          <PDFDownloadLink document={pdfDocument} fileName="generated.pdf">
            {({ loading }) => (
              <Button variant="contained" color="primary" disabled={loading}>
                {loading ? 'Генерация PDF...' : 'Скачать PDF'}
              </Button>
            )}
          </PDFDownloadLink>
        )}
      </Container>
    </>
  );
};

export default GeneratePdfPage;
