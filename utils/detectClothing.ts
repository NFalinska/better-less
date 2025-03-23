import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as FileSystem from "expo-file-system";
import { decodeJpeg } from "@tensorflow/tfjs-react-native";
import {Alert, Platform} from "react-native";

// Завантаження моделі
let model: cocoSsd.ObjectDetection | null = null;

export async function detectClothing(imageUri: string) {
    console.log("Функція detectClothing викликана!");

    try {
        if (Platform.OS === "web") {
            throw new Error("TensorFlow.js не підтримується у веб-версії Expo!");
        }

        console.log("Налаштовую TensorFlow backend...");
        await tf.setBackend("rn-webgl");
        await tf.ready();
        console.log("TensorFlow готовий!");

        console.log("Платформа підтримується, завантажую модель...");
        if (!model) {
            model = await cocoSsd.load();
        }

        console.log("Модель завантажена, читаю зображення...");
        const imageBase64 = await FileSystem.readAsStringAsync(imageUri, {
            encoding: FileSystem.EncodingType.Base64,
        });

        console.log("Розмір base64:", imageBase64.length);

        console.log("Конвертую base64 у Tensor...");
        const imageBuffer = tf.util.encodeString(imageBase64, "base64").buffer;
        let imageTensor = decodeJpeg(new Uint8Array(imageBuffer));

        console.log("Форма тензора зображення:", imageTensor.shape);

        // 🔥 Зменшуємо розмір для кращого розпізнавання
        imageTensor = tf.image.resizeBilinear(imageTensor, [640, 640]);
        imageTensor = imageTensor.toInt();

        console.log("Форма тензора зменшеного зображення:", imageTensor.shape);

        console.log("Виконую розпізнавання...");
        const predictions = await model.detect(imageTensor);

        console.log("Усі знайдені об'єкти:", predictions);

        // 🔥 Виводимо ВСІ класи, щоб перевірити, чи є одяг
        console.log("Класи знайдених об'єктів:", predictions.map(p => p.class));

        const clothingItems = predictions
            .filter(pred => ["person", "sneakers", "handbag", "tie", "backpack"].includes(pred.class))
            .filter(pred => pred.score > 0.2)
            .map(pred => pred.class);

        console.log("Виявлений одяг:", clothingItems);
        return clothingItems;
    } catch (error) {
        console.error("Помилка в detectClothing:", error);
        return [];
    }
}
