import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity, Linking, SafeAreaView, Image, Modal, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Communitytopic({ navigation }) {
    const cardsData = [
        {
            id: 1,
            title: 'Cosmetic Procedures Are Dominating Social Media, What Does This Mean For Mental Health?',
            description: 'Celebrities and influencers regularly promote various cosmetic surgeries and procedures through the media. Social media can have a negative effect on body image, as people compare themselves to those they follow. With cosmetic surgeries becoming more popular, we risk losing our individuality in striving for the same "ideal"',
            category: 'Social Media',
            datePosted: '02/08/2023',
            link: 'https://www.verywellmind.com/normalization-plastic-surgery-social-media-mental-health-7093826',
            image: require('./id1.png'),
        },

        {
            id: 2,
            title: 'If You Were Laid Off Recently, Here is How to Cope',
            description: 'Mass layoffs have impacted thousands of workers across the tech and media industries. In some instances, employees have been given little to no notice. People who have been laid off or fear they could be deal with poor mental health.',
            category: 'Mental Health',
            datePosted: '02/02/2023',
            link: 'https://www.verywellmind.com/managing-mental-health-when-you-get-laid-off-7100701',
            image: require('./id2.png'),
        },

        {
            id: 3,
            title: 'When Oversharing Turns into Trauma Dumping, and How to Stop',
            description: 'There’s a difference between venting and trauma dumping. Oversharing traumatic or difficult experiences on others in a repeated or unsolicited way can push them away. Recognizing that you might be a trauma dumper can help you learn healthy ways to cope with trauma and maintain relationships. ',
            category: 'Trauma',
            datePosted: '11/21/2023',
            link: 'https://www.verywellmind.com/what-is-trauma-dumping-do-you-do-it-5205229',
            image: require('./id3.png'),
        },

        {
            id: 4,
            title: 'Why We Love Fall So Much, According to Psychology',
            description: 'Fall is a temporal landmark, a moment that influences how we see and use time, and tends to boost people’s motivation. Many people see fall as a time for a fresh start, perhaps due to long-held associations with going back to school in September. Psychology experts say we can maximize the mental health benefits of the season by spending time in nature, setting goals, and prioritizing favorite activities. ',
            category: 'Wellness',
            datePosted: '10/25/2023',
            link: 'https://www.verywellmind.com/the-psychological-reason-why-we-love-fall-so-much-5205863',
            image: require('./id4.png'),
        },

        {
            id: 5,
            title: 'Solastalgia May Be the Reason Climate Change Is Making You Depressed',
            description: 'When the places that matter most to us—our homes, our lands, and our communities—are disrupted, changed, or threatened, we may also sustain a less visible but no less damaging impact that is carried with us emotionally. The term for this condition, solastalgia, was coined by Australian environmental philosopher Glenn Albrecht in the early 2000s to describe the unique mental anguish caused by living with the experience of negative environmental change.',
            category: 'Depression',
            datePosted: '09/14/2023',
            link: 'https://www.verywellmind.com/solastalgia-definition-symptoms-traits-causes-treatment-5089413',
            image: require('./id5.png'),
        },

        {
            id: 6,
            title: 'How Do Other Countries Deal With Mental Health?',
            description: 'While stigma remains one of the biggest barriers to seeking mental health for the BIPOC community, the conversation doesn’t end there. To align with Minority Mental Health Month, this spotlight aims to shed light on some of the lesser-explored factors that impact the BIPOC community’s ability to access mental health treatment—from health literacy and alternate healing methods to epigenetics and generational trauma.',
            category: 'Mental Health',
            datePosted: '07/05/2023',
            link: 'https://www.verywellmind.com/how-do-other-countries-deal-with-mental-health-7556304',
            image: require('./id6.png'),
        },

        {
            id: 7,
            title: 'Verywell Mind Insights',
            description: 'Verywell Mind Insights is our effort to identify and measure shifting attitudes and behaviors around mental health. Through regular surveys of thousands of adults living in the US, we are keeping our fingers on the pulse of mental health in America and capture the sentiment surrounding the topics that matter most to our readers and their families. Check out the results and findings from surveys conducted to date',
            category: 'Mental Health',
            datePosted: '09/06/2023',
            link: 'https://www.verywellmind.com/mental-health-data-insights-5185693',
            image: require('./id7.png'),
        },

        {
            id: 8,
            title: 'How Awareness of Epigenetics and Generational Trauma Can Inform Therapy',
            description: 'Epigenetics refers to how experiences are imprinted in genes and passed down as generational trauma. Historic and ongoing systemic racism may impact the genes of affected people, potentially into future generations. An expanded awareness of epigenetics and generational trauma has the potential to inform mental health care.',
            category: 'Trauma',
            datePosted: '07/05/2023',
            link: 'https://www.verywellmind.com/awareness-of-epigenetics-and-generational-trauma-can-inform-therapy-and-empower-those-struggling-with-their-mental-health-5218280',
            image: require('./id8.png'),
        },

        {
            id: 9,
            title: 'Earthing – A Technique to Help Ground Your Body',
            description: 'Earthing, also known as grounding, allows people to directly connect their bodies with the Earth and use its natural electric charges to stabilize them. This practice involves walking barefoot outdoors or using indoor grounding systems while sleeping or sitting. Although earthing can positively impact the mind, this form of grounding differs from the practice used in mental health treatment. Earthing research suggests reduced pain, stress, and inflammation and an improvement of overall mental well-being.',
            category: 'Wellness',
            datePosted: '05/04/2023',
            link: 'https://www.verywellmind.com/what-is-earthing-5220089',
            image: require('./id10.png'),
        },

        {
            id: 10,
            title: 'What Will the Future of Mental Health Care Bring?',
            description: 'In a short span of time, the pandemic has increased our awareness of the vulnerability of our mental health. Sitting squarely at the intersection of our physical health and external circumstances, we’ve seen how quickly our moods and behaviors can be impacted by circumstances and challenges, and we’ve also realized just how strong and resilient our minds can be.',
            category: 'Mental Health',
            datePosted: '02/15/2023',
            link: 'https://www.verywellmind.com/future-of-mental-health-care-5199120',
            image: require('./id9.png'),
        },

        {
            id: 11,
            title: 'How Helping the Environment Can Make You Feel Better',
            description: 'Climate change is a threat significantly impacting each of us, with the perils of our declining environment becoming more and more unsettling by the day. If you’re feeling guilt, anxiety, sadness, and anger about earth changes, you certainly arent alone. The answer isnt to avoid the natural world. Rather, it is to go towards it. Connecting to the environment can help decrease stress and increase your mental health.',
            category: 'Wellness',
            datePosted: '04/17/2023',
            link: 'https://www.verywellmind.com/how-helping-the-environment-can-make-you-feel-better-5296131',
            image: require('./id11.png'),
        },

        {
            id: 12,
            title: 'A Friendly Reminder: Showing Your Emotions Is Not a Sign of Weakness',
            description: 'Despite societal progress, being openly emotional is still viewed as a feminine trait, but theres nothing wrong with tapping into your feminine side regardless of gender. Holding in emotions, or dealing with them unhealthily, leads to several physical and mental health problems. Sharing feelings doesn’t show a lack of strength; it’s actually a sign of resilience. ',
            category: 'Mental Health',
            datePosted: '04/16/2023',
            link: 'https://www.verywellmind.com/news-showing-emotions-benefits-mental-health-7368720',
            image: require('./i12.png'),
        },

        {
            id: 13,
            title: 'DepressMental Health Days Help Kids, But Systemic Barriers Prevent Widespread Useion',
            description: 'The concept of the mental health day is not new, but as with many aspects of self-care, its importance may have been misunderstood or under-appreciated until the last couple years. Whether from pandemic stress, burnout, financial insecurity, or any number of other stressors, many of us—kids included—feel the need for a mental health day every now and then.',
            category: 'Mental Health',
            datePosted: '04/27/2023',
            link: 'https://www.verywellmind.com/mental-health-days-and-kids-survey-6361951',
            image: require('./id13.png'),
        },

        {
            id: 14,
            title: 'Mindfulness Training Helps Kids Sleep Longer, Study Shows',
            description: 'Kids from low-income households who learned how to practice mindfulness at school gained an extra 74 minutes of sleep time, on average, according to a new study. Time spent in REM sleep, which is important for emotional well-being, also went up for many children who participated in mindfulness training. Children who don’t have access to mindfulness training can develop these skills through simple exercises at home, with the help of a parent or caregiver.',
            category: 'Wellness',
            datePosted: '01/23/2023',
            link: 'https://www.verywellmind.com/mindfulness-training-helps-kids-sleep-study-shows-5192533',
            image: require('./id14.png'),
        },

        {
            id: 15,
            title: 'Teenage Girls Are Considering Suicide At Alarming Rates. How Can This Change?',
            description: 'Between 2011 and 2021, the rate of teenage girls considering attempting suicide increased from 19% to 30%. Factors such as isolation, social media, and lack of access to mental health care all may have contributed. Structural and individual changes are necessary to lower the rates.',
            category: 'Suicide',
            datePosted: '04/12/2023',
            link: 'https://www.verywellmind.com/how-can-we-reduce-suicidal-ideation-in-teenage-girls-7369511',
            image: require('./id15.png'),
        },

        {
            id: 16,
            title: 'Chat Bots and AI Are Changing Mental Health Care, Beware',
            description: 'Some people are turning to AI platforms like ChatGPT for mental health support, but this is risky when they definitely arent qualified medical professionals. AI chatbots for mental health are being developed, however. AI in mental health is still relatively new but could become more useful in the future.  ',
            category: 'Mental Health',
            datePosted: '03/02/2023',
            link: 'https://www.verywellmind.com/artificial-intelligence-is-changing-mental-health-care-7112883',
            image: require('./id17.png'),
        },

        {
            id: 17,
            title: 'How an Anxious Attachment Style Can Impact a Relationship',
            description: 'You know the feeling, the one you get after finally hitting send on that well-crafted text to your new love interest, and an hour goes by, then two, then ten, and they still haven’t replied? The way your mind jumps to the conclusion that they aren’t interested in you anymore, or that they can’t text you because they are hanging out with someone else—even if things have been going great? If this sounds familiar, it’ll give you a sense of what it’s like to date with an anxious attachment style. ',
            category: 'Relationships',
            datePosted: '03/15/2023',
            link: 'https://www.verywellmind.com/navigating-relationships-with-an-anxious-attachment-style-in-the-21st-century-5225019',
            image: require('./id16.png'),
        },

        {
            id: 18,
            title: 'Modern Femininity: Why Being Untraditional Is So Stressful',
            description: 'Societal norms emphasize traditional benchmarks, such as marriage and kids, as a sign of success for women. Other accomplishments often arent met with the same level of support. Conversations with loved ones and internal reflections can aid in combatting these patterns. ',
            category: 'Social Media',
            datePosted: '02/24/2023',
            link: 'https://www.verywellmind.com/modern-femininity-why-being-untraditional-is-stressful-7109416',
            image: require('./id18.png'),
        },

        {
            id: 19,
            title: 'You Are Enough Just as You Are—but Its OK To Seek Self-Improvement Too',
            description: 'Self-acceptance and self-improvement are often seen as exclusive of each other. Mental health experts explain the importance of balancing the two to create a happy, fulfilled life. The main takeaway: You dont need to accomplish certain things to be enough. You are enough already as you embark on the adventure of your life.',
            category: 'Wellness',
            datePosted: '01/21/2023',
            link: 'https://www.verywellmind.com/you-are-enough-self-improvement-finding-balance-7093355',
            image: require('./id19.png'),
        },

        {
            id: 20,
            title: 'For Americans With Negative Body Image, the Wrong Comment Can Make It Even Worse',
            description: 'Body image is not a new problem, with 30% of Americans feeling negatively about their appearance overall. But as with many things relating to our mental health, the COVID-19 pandemic has made it worse for some. Half of Americans have been worrying about their appearance at least weekly over the last month, and 22% worry about their appearance more than they did before the pandemic.',
            category: 'Social Media',
            datePosted: '12/22/2021',
            link: 'https://www.verywellmind.com/body-image-and-commenting-on-appearance-5213891',
            image: require('./id20.png'),
        },
        
    ];

    const [cards, setCards] = useState(cardsData);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [isFiltering, setIsFiltering] = useState(false);

    const filterCards = (category) => {
        setIsFiltering(true);
        setTimeout(() => {
            if (category === '') {
                setCards(cardsData);
            } else {
                const filteredCards = cardsData.filter(card => card.category === category);
                setCards(filteredCards);
            }
            setIsFiltering(false);
        }, 500); // Adjust this value for filtering speed
    };

    const openLink = (url) => {
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    return (
        <ImageBackground
                source={require('./background2.png')} // Replace with your image path
                style={styles.imageBackground}
                resizeMode="cover"
            >
        <SafeAreaView style={styles.safeArea}>
           
                <Text style={styles.title}>Community Topics</Text>
                <Pressable
                    style={styles.filterButton}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.filterButtonText}>Filter by Category</Text>
                </Pressable>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            {isFiltering ? <Text>Loading...</Text> : null}
                            <Picker
                                selectedValue={selectedCategory}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => {
                                    setSelectedCategory(itemValue);
                                    filterCards(itemValue);
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <Picker.Item label="All" value="" />
                                <Picker.Item label="Mental Health" value="Mental Health" />
                                <Picker.Item label="Wellness" value="Wellness" />
                                <Picker.Item label="Suicide" value="Suicide" />
                                <Picker.Item label="Social Media" value="Social Media" />
                                <Picker.Item label="Relationships" value="Relationships" />
                                <Picker.Item label="Trauma" value="Trauma" />
                              
                            </Picker>
                        </View>
                    </View>
                </Modal>

                <ScrollView style={styles.scrollView}>
                    {cards.map(card => (
                        <TouchableOpacity
                            key={card.id}
                            style={styles.card}
                            onPress={() => openLink(card.link)}
                        >
                            <Image source={card.image} style={styles.cardImage} />
                            <Text style={styles.cardTitle}>{card.title}</Text>
                            <Text style={styles.cardInfo}>Posted on: {card.datePosted}</Text>
                            <Text style={styles.cardInfo}>Category: {card.category}</Text>
                            <Text style={styles.cardDescription}>{card.description}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            
        </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    imageBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginVertical: 10,
    },
    filterButton: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
        paddingBottom: 15,
        elevation: 2,
        alignSelf: 'center',
        marginTop: 5,
    },
    filterButtonText: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        fontWeight: 'bold',
        height: 100,
        backgroundColor: 'white'
    },
    picker: {
        width: 300,
        height: 50,
        // backgroundColor: 'yellow', // Add background color here
    },
    scrollView: {
        flex: 1,
    },
    card: {
        backgroundColor: 'white',
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 5,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    cardImage: {
        width: '100%',
        height: 150,
        borderRadius: 5,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
    },
    cardInfo: {
        fontSize: 14,
        color: 'grey',
    },
    cardDescription: {
        fontSize: 14,
        color: 'gray',
    },
});
