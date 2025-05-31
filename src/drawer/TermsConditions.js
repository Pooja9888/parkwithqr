import { StyleSheet, Text, View, ImageBackground, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
// import colors from '../const/colors';
// import images from '../const/images';

const { width, height } = Dimensions.get('window');
const TermsConditions = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate('DetailSecond');
  };

  return (
    <View style={styles.container}>
      {/* <ImageBackground
        source={images.backgroundImage}
        style={styles.imageBackground}
        resizeMode="cover"
      > */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.titleText}>Terms & Conditions</Text>
        <Text style={styles.headingText}>1. GENERAL INFORMATION</Text>
        <Text style={styles.bodyText}>1.1 Scope and Definitions</Text>
        <Text style={styles.paraText}>This website is owned and operated by StroPole Technologies Private Limited. The information provided through this website is based on user inputs. Use of this website by you ("You" and "Your" construed accordingly) is subject to these terms and conditions ("Website Terms"). StroPole Technologies ("DaddysRoad") reserves the right to modify the Website Terms at any time without prior notice. Modifications to services, functionality, or design can also be made without liability to users.</Text>
        <Text style={styles.bodyText}>1.2 Acceptance of Conditions</Text>
        <Text style={styles.paraText}>By using this website, you agree to be legally bound by these Website Terms. If you disagree with these terms, do not perform actions such as vehicle checks or send notifications. Personal data will be processed per our Privacy Policy. Users must not extract, reproduce, or display data using automated tools unless explicitly agreed to by DaddysRoad in writing.
          DaddysRoad may withdraw user accounts or suspend services if these terms are breached. These conditions establish legally binding obligations under the Indian Contract Act, 1872.</Text>
        <Text style={styles.bodyText}>1.3 Variation of Terms and Services</Text>
        <Text style={styles.paraText}>DaddysRoad reserves the right to modify the Website Terms, app functionality, and services. Changes take effect immediately upon publication on the platform. Continued use of the services signifies acceptance of updated terms.</Text>
        <Text style={styles.headingText}>2. Use of the Service</Text>
        <Text style={styles.bodyText}>2.1 User Account and Information Accuracy</Text>
        <Text style={styles.paraText}>Users must create an account, providing accurate personal information such as name, email, and phone number.</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>Users are allowed only one account.</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>Impersonation or incorrect vehicle registrations are prohibited.</Text>
        </View>
        <Text style={styles.bodyText}>2.2 Non-Commercial Use</Text>

        <Text style={styles.paraText}>The app’s services are solely for private, non-commercial purposes, such as registering your vehicle details, setting reminders, and contacting vehicle owners in emergencies.</Text>
        <Text style={styles.bodyText}>2.3 USE OF Alpha IGI BY MINORS</Text>
        <Text style={styles.paraText}>You must be 18 years of age, or the age of majority in your province, territory or country, to sign up as a registered user of the Products. Individuals under the age of 18, or the applicable age of majority, may view the audiovisual content displayed in the Products only with the involvement and consent of a parent or legal guardian, under such person's account, and otherwise subject to these Terms. This provision shall not be applicable to registrations made under certain Community (as defined below) offerings where specified in applicable contracts between Alpha IGI and the Community.</Text>
        <Text style={styles.bodyText}>2.4 MEMBERSHIP</Text>
        <Text style={styles.paraText}>As a Alpha IGI Member you will receive access to certain sections, features and functions of the Products that are not available to non-members. By agreeing to become a Member you may receive occasional special offer, marketing, and survey communication emails with respect to the Product. You can easily unsubscribe from Alpha IGI commercial emails by following the opt-out instruction in these emails. Alpha IGI membership accounts and subscriptions are not transferable and therefore you agree to not sell, transfer, or exchange membership accounts or subscriptions in any way or under any circumstance. This expressly applies to any discounted, subsidized, or free accounts or subscriptions.</Text>
        <Text style={styles.bodyText}>2.5 SUBSCRIPTIONS</Text>

        <Text style={styles.paraText}>(a) Alpha IGI account holders may access the Products via “Alpha IGI Plus”, a subscription fee-based program, which gives access to all content within the Products. You will only have access to Alpha IGI Plus while your paid subscription is active and subsisting. You may have access to a free trial period of Alpha IGI Plus, which automatically converts to a paid annual or monthly subscription term after a certain period of time. In such instances, you can disable the automatic conversion by following the cancellation instructions set forth in section 3 prior to the date of conversion. You may access Alpha IGI Plus in the following ways: by purchasing a subscription to the Products from the Website, within the Apps, where allowed by the App marketplace partners, or through a bundle with one or more of our bundle subscription partners. Please note that if you purchase a subscription through the Apple iTunes Store or our iPhone application, the sale is final, and we will not provide a refund. Your purchase will be subject to Apple’s applicable payment policy, which also may not provide for refunds. If you purchase a subscription through the Google Play store, the sale is final and we will not provide a refund. Your purchase will be subject to Google’s applicable payment policy, which also may not provide for refunds. If you purchase through one or more of our bundle subscription partners, the purchase may be further subject to the Terms and Conditions of such partners, and payment and management of the bundle subscription may be administered by them. Additionally, you may receive access to Alpha IGI Plus via your Community (as defined and further outlined in section 2.8 below). In such instances you may still be required to provide Your payment information in order to access Alpha IGI Plus.</Text>

        <Text style={styles.paraText}>(b) You may access Alpha IGI Plus via a monthly or annual subscription option. For the purposes of our monthly and yearly subscriptions, a month constitutes 30 calendar days and a year constitutes 365 calendar days.</Text>
        <Text style={styles.paraText}>(c) Our “Monthly” subscription is paid in monthly installments. For each month that your monthly subscription is active, you acknowledge and agree that Alpha IGI is authorized to charge the same credit card as was used for the initial subscription fee or other payment method as set forth in section 2.5(h) (the “Payment Method”). The monthly renewal subscription fees will continue to be billed to the Payment Method you provided until cancelled. You must cancel your subscription before it renews in order to avoid billing of the next month’s subscription fee to the Payment Method you provided. Refunds cannot be claimed for any partial-month subscription period.</Text>
        <Text style={styles.paraText}>(d) Our “Yearly” subscription is paid for by an upfront payment with automatic annual renewals. You acknowledge and agree that Alpha IGI is authorized to charge the Payment Method used for (i) the initial annual subscription fee at the rate secured at the time of purchase, and (ii) the non-discounted renewal subscription fee(s). You must cancel your subscription before it renews in order to avoid billing of the renewal subscription fee to the Payment Method you provided. Refunds cannot be claimed for any partial subscription period.
          (e) Subscription{"\n"}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>(a) Alpha IGI offers certain special discount pricing options (the “Special Discount Pricing Options”). The Special Discount Pricing Options will permit users to access to the same content included in Alpha IGI Plus; such Special Discount Pricing Options shall only be available to qualified users (the “Qualified Users”). To be considered a Qualified User, your information will be provided directly Alpha IGI’s third-party verification system. Alpha IGI reserves the right to determine if you are a Qualifying User in our sole discretion.{"\n"}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>(b) Alpha IGI Special Discount Pricing Options include the following:</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>(i) The Student Discount Offer, the terms of which can be found in the Student Discount Offer Terms and Conditions.</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>(ii) The Alpha IGI Family plan, the terms of which can be found in the Alpha IGI Family Terms and Conditions.
            (g) You agree to promptly notify Alpha IGI of any changes to the Payment Method you provided while any subscriptions remain outstanding. You are responsible for all applicable fees and charges incurred, including applicable taxes, and all subscriptions purchased by you.
            (h) In the course of your use of the Products, Alpha IGI and its third party payment service provider may receive and implement updated credit card information from your credit card issuer in order to prevent your subscription from being interrupted by an outdated or invalid card. This disbursement of the updated credit card information is provided to Alpha IGI and Alpha IGI’s third party payment service provider at the sole election of your credit card issuer. Your credit card issuer may give you the right to opt-out of the update service. Should you desire to do so, please contact your credit card issuer.
            (i) Our obligation to provide the Products only comes into being when we take receipt of your Order, and we confirm your purchase to you by email. We shall confirm your Order and send you an email to confirm your access to the subscription purchased. Please quote the Order number in all subsequent correspondence with us. Prices in US Dollars and Euros include local taxes. All prices in Pound Sterling include VAT unless otherwise stated. You agree not to hold us responsible for banking charges incurred due to payments on your account. If payment is not received by us from the Payment Method you provided, you agree to pay all amounts due upon demand by us. You agree that you are not permitted to resell any Products purchased through Alpha IGI for commercial purposes.</Text>
        </View>
        <Text style={styles.bodyText}>2.6 DEVICE REQUIREMENTS</Text>
        <Text style={styles.paraText}>To enjoy Alpha IGI via your smartphone or other Device, your Device must satisfy certain system requirements. These requirements can be found on the Website and the Google, Apple and Amazon App marketplaces.</Text>
        <Text style={styles.bodyText}>2.7 GIFTING</Text>
        <Text style={styles.paraText}>“Gift Subscriptions” are pre-paid memberships to the Products. A person who purchases the gift is referred to in these terms as the “Giftor”. A person who receives and redeems a Gift Subscription to the Products is referred to in these terms as the “Recipient”. Gift subscriptions are paid for by a one-time upfront payment. Once bought, the Giftor will receive an Order confirmation and receipt. The Alpha IGI gift subscription will be sent to the Recipient on the Giftor’s specified date. Gifting codes can only be used once in the country for which they were purchased and cannot be redeemed for cash, resold or combined with any other offers, including free trial. Please note that gifting codes cannot be redeemed if the Recipient has already purchased a subscription through the Apple iTunes Store or our iPhone application, or the Google Play Store or our Android application. We will automatically bill the Payment Method you provided for any purchased Gift Subscriptions at the time of purchase, not delivery. There are no refunds or other credits for Gift Subscription that are not redeemed. Alpha IGI will notify the Recipient prior to the end of the Gift Subscription that the gift period is about to expire. Alpha IGI is not responsible if a Gift Subscription is lost, stolen or used without permission.</Text>
        <Text style={styles.bodyText}>2.8 CORPORATE AND OTHER CONSUMER COMMUNITIES</Text>
        <Text style={styles.paraText}>Many consumer communities (corporations, universities, hospitals, etc.) (“Community” or “Communities”) purchase and introduce the Products to their employees and members. In some cases, these Communities may supplement these Terms with their own terms and conditions, which may include additional terms around subscription redemption, usage or supplementary payment for Alpha IGI Plus access. In such event, these Community terms and conditions shall also apply to your use of the Products. In the event of any conflict with such additional terms and these Terms, the additional terms shall prevail.</Text>
        <Text style={styles.bodyText}>2.9 CHANGING FEES AND CHARGES</Text>
        <Text style={styles.paraText}>We reserve the right to change our subscription plans or adjust pricing for our service or any components thereof in any manner and at any time as we may determine in our sole and absolute discretion. Except as otherwise expressly provided for in these Terms, any price changes or changes to your subscription plan will take effect following notice to you.</Text>
        <Text style={styles.headingText}>3. CANCELLATION OF SERVICES</Text>
        <Text style={styles.bodyText}>3.1 CANCELLATION BY YOU</Text>


        <Text style={styles.paraText}>(a) You may cancel a Monthly subscription at any time. Cancellation is effective at the end of the applicable monthly period. Please make any such cancellation by visiting here or emailing support@alphaigi.com.
          (b) You may cancel a Yearly subscription plan at any time. Cancellation is effective at the end of the applicable annual period.
          (c) Please note that if you purchase a subscription through the Apple iTunes Store or our iPhone application, you may cancel your subscription by cancelling automatic renewal of paid In App Subscriptions by selecting Manage App Subscriptions in your iTunes Account settings and selecting the subscription you want to modify. If you purchase a subscription through the Google Play store you may cancel automatic renewals in account settings under Subscriptions in the Google Play app, or according to the current process outlined by Google Play.</Text>
        <Text style={styles.bodyText}>3.2 CANCELLATION BY US</Text>
        <Text style={styles.paraText}>We may suspend or terminate your use of the Products as a result of your fraud or breach of any obligation under these Terms. Such termination or suspension may be immediate and without notice. A breach of these Terms, includes without limitation, the unauthorized copying or download of our audio or video content from the Products.</Text>
        <Text style={styles.bodyText}>3.3 PROMOTION AND DISCOUNT CODES</Text>
        <Text style={styles.paraText}>Any promotion code or offer (including the Special Discount Pricing Options) provided by us may not be used in conjunction with any other promotion code or offer, past or present. Introductory offers are only available to new users of the Products, except where expressly stated otherwise. Previous users or trial users of the Products do not qualify as new users. No promotion code or discount will apply to corporate or other Community subscriptions. Unless otherwise set forth in the terms of any promotion, all pricing promotions or discounts will apply to the initial period of the subscription, and any renewals will be charged at the non-discounted rate for the type of subscription purchased.</Text>
        <Text style={styles.headingText}>4. PROHIBITED USE OF THE PRODUCTS</Text>
        <Text style={styles.bodyText}>4.1 </Text><Text style={styles.paraText}>You agree not to upload, post, email or otherwise send or transmit or introduce any material that contains software viruses or any other computer code, files or programs designed to interrupt, harm, damage, destroy or limit the functionality of any computer software or hardware or equipment linked directly or indirectly with the Products or the Products themselves. You agree not to interfere with the servers or networks underlying or connected to the Products or to violate any of the procedures, policies or regulations of networks connected to the Products. You may not access the Products in an unauthorized manner.</Text>

        <Text style={styles.bodyText}>4.2</Text>
        <Text style={styles.paraText}> You agree not to impersonate any other person while using the Products, conduct yourself in an offensive manner while using the Products, or use the Products for any illegal, immoral or harmful purpose.</Text>
        <Text style={styles.bodyText}>4.3</Text>
        <Text style={styles.paraText}>By breaching the provisions of this section 4, you may commit a criminal offense under applicable laws. We may report any such breach to the relevant law enforcement authorities and we may cooperate with those authorities by disclosing your identity to them. In the event of such a breach, your right to use the Products will cease immediately.</Text>

        <Text style={styles.bodyText}>4.4</Text>
        <Text style={styles.paraText}>You agree not to use the Products for any purposes related to scientific research, analysis or evaluation of the Products without the express written consent of Alpha IGI.</Text>
        <Text style={styles.headingText}>5. MATERIALS OFFERED THROUGH THE PRODUCTS</Text>
        <Text style={styles.bodyText}>5.1 COPYRIGHT</Text>

        <Text style={styles.paraText}>(a) All materials (including software and content whether downloaded or not) contained in the Products are owned by Alpha IGI (or our affiliates and/or third party licensors, where applicable), unless indicated otherwise. You agree and acknowledge that the materials are valuable property and that other than any specific and limited license for use of such materials, you shall not acquire any ownership rights in or to such materials. The materials may not be used except as provided for in these Terms, and any other relevant terms and conditions provided to you without our prior written permission.
          (b) You acknowledge and agree that certain materials on or in the Products are the property of third party licensors and, without prejudice to any and all other rights and remedies available, each such licensor has the right to directly enforce relevant provisions of section 12 against you.
          (c) Audio or video content from Alpha IGI not explicitly indicated as downloadable may not be downloaded or copied from the Products or any Device.
          (d) The Products are not intended for your commercial use. Commercial advertisements, affiliate links, and other forms of solicitation may be removed by us without notice and may result in termination of privileges. You must not use any part of the materials used in or on the Products for commercial purposes without obtaining a written license to do so from us. Material from the Products may not be copied or distributed, or republished, or transmitted in any way, without our prior written consent. Any unauthorized use or violation of these Terms immediately and automatically terminates your right to use the Products and may subject you to legal liability. You agree not to use the Products for illegal purposes (including, without limitation, unlawful, harassing, libelous, invasion of another’s privacy, abusive, threatening or obscene purposes) and you agree that you will comply with all laws, rules and regulations related to your use of the Products. Appropriate legal action may be taken for any illegal or unauthorized use of the Products.
          (e) A limited amount of content may be marked and authorized for the user to share in their personal social channels (Facebook, Twitter, etc.). With respect to content made available by Alpha IGI through the Products that is specifically identified as available for distribution by you (“Distribution Content”) as part of your blog or other online commentary, analysis or review (“User Commentary”), Alpha IGI grants you a limited right to download, reproduce and distribute Distribution Content over the internet as part of your User Commentary. You may also modify such Distribution Content but only as required to technically enable the display and distribution of such content through your computer systems and over the Internet (e.g. a change in video format or file size) provided such modification does not materially alter the substance or quality of such content. Your display and distribution of Distribution Content may also be subject to other terms and conditions that are set forth in the description of such content in the Products, such as display and distribution of Distribution Content only within specified usage dates. You agree not to publish the Distribution Content with other content that is known by you to be false, inaccurate, or misleading or that is, or that encourages activity or conduct that is, unlawful, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, pornographic, libelous, invasive of another’s privacy, hateful, or racially, ethnically or otherwise objectionable. Distribution Content may contain trackers that enable us to collect information with respect to the distribution and consumption of such content.
          (f) You may not otherwise download, display, copy, reproduce, distribute, modify, perform, transfer, create derivative works from, sell or otherwise exploit any content, code, data or materials in the Products. If you make other use of the Products, or the content, code, data or materials thereon, except as otherwise provided above, you may violate copyright and other laws of the Singapore, other countries, as well as applicable state laws and may be subject to liability for such unauthorized use. Alpha IGI will enforce its intellectual property rights to the fullest extent of the law, including the seeking of criminal prosecution.</Text>
        <Text style={styles.bodyText}>5.2 TRADEMARKS</Text>
        <Text style={styles.paraText}>Alpha IGI®, the Alpha IGI logo and all other Alpha IGI product or service marks are trademarks of Alpha IGI. All intellectual property, other trademarks, logos, images, product and company names displayed or referred to on or in the Products are the property of their respective owners. Nothing grants you any license or right to use, alter or remove or copy such material. Your misuse of the trademarks displayed on the Products is strictly prohibited. Alpha IGI will enforce its trademark rights to the fullest extent of the law, including the seeking of criminal prosecution.</Text>
        <Text style={styles.headingText}>6. AVAILABILITY OF PRODUCTS</Text>
        <Text style={styles.bodyText}>6.1</Text>
        <Text style={styles.paraText}>Although we aim to offer you the best service possible, we make no promise that the Products will meet your requirements and we cannot guarantee that the Products will be fault free. If a fault occurs in the Products, please report it to us at help@alphaigi.com and we will review your complaint and, where we determine it is appropriate to do so, correct the fault. If the need arises, we may suspend access to the Products while we address the fault. We will not be liable to you if the Products are unavailable for a commercially reasonable period of time.</Text>
        <Text style={styles.bodyText}>6.2</Text>
        <Text style={styles.paraText}>Your access to the Products may be occasionally restricted to allow for repairs, maintenance or the introduction of new facilities or Products. We will restore the Products as soon as we reasonably can. In the event that the Products are unavailable, our usual Order and cancellation deadlines apply; please notify us of changes to your Order by emailing help@alphaigi.com.</Text>
        <Text style={styles.headingText}>7. USER MATERIAL</Text>
        <Text style={styles.bodyText}>7.1 </Text>
        <Text style={styles.paraText}>The Products may let you submit material to us: for example, you may be able post comments or images in certain functions or features of the Product. In these Terms, we use the term “User Material” to refer to any publicly available material of any kind that you submit to us, including text, files, images, photos, video, sounds and musical or literary works. User Material does not include the account information, Product purchase, or Product use information which you provide in registering for and using Products.</Text>
        <Text style={styles.bodyText}>7.2</Text>
        <Text style={styles.paraText}> This section 7 sets out the rights and obligations that each of us have in connection with User Material. If you review or submit User Material, you are agreeing to do so in accordance with these Terms. If you do not want to review or submit User Material in accordance with these Terms, then you should not do so.</Text>
        <Text style={styles.bodyText}>7.3</Text>
        <Text style={styles.paraText}>We do not systematically review User Material submitted by you or other users. We are not responsible for the content of User Material provided by you or any other user. We do not necessarily endorse any opinion contained in such material. We make no warranties or representations, express or implied, about User Material, including as to its legality or accuracy.</Text>
        <Text style={styles.bodyText}>7.4 </Text>
        <Text style={styles.paraText}>We reserve the right, in our sole discretion, to refuse to post or to remove or edit any of your User Material, or to restrict, suspend, or terminate your access to all or any part of the Products, particularly where User Material breaches this section 7, and we may do this with or without giving you any prior notice.</Text>
        <Text style={styles.bodyText}>7.5</Text>
        <Text style={styles.paraText}> We may link User Material or parts of User Material to other material, including material submitted by other users or created by Alpha IGI or other third parties. We may use User Material for our internal business purposes, for example, to examine trends or categories or to promote, market or advertise Alpha IGI. You acknowledge that we may indirectly commercially benefit from use of your User Material.</Text>
        <Text style={styles.bodyText}>7.6</Text>


        <Text style={styles.paraText}>Each time you submit User Material to us, you represent and warrant to us as follows:</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>(a) You own your User Material or have the right to submit it, and in submitting it you will not be infringing any rights of any third party, including intellectual property rights (such as copyright or trademark), privacy or publicity rights, rights of confidentiality or rights under contract.</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>(b) Your User Material is not illegal, obscene, defamatory, threatening, pornographic, harassing, hateful, racially or ethnically offensive, and does not encourage conduct that would be considered a criminal offense, and does not give rise to civil liability, violate any law, or is otherwise deemed inappropriate.</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>(c) Your User Material does not advertise any product or service or solicit any business.</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>(d) Your User Material does not identify any individual (including by way or name, address or a still picture or video) under the age of 18 and if User Material identifies any individual over the age of 18, you have that person’s consent to being identified in exactly that way in your User Material; and in submitting your User Material you are not impersonating any other person.</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>(e) You will not collect email addresses of users for the purpose of sending unsolicited email.</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>(f) You will not engage in criminal or tortious activity, including fraud, spamming, spimming, sending of viruses or other harmful files, copyright infringement, patent infringement, or theft of trade secrets or attempt to impersonate another user or person.</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>(g) You will not engage in any automated use of the system, such as using scripts to alter our content.</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>(h) You will not, without authorization, access, tamper with, or use non-public areas of the Products, Alpha IGI’s computer systems, or the technical delivery systems of Alpha IGI’s providers.</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>(i) Except as necessary to maintain your own computer security by use of commercial-off-the-shelf anti-virus or anti-malware products, you will not attempt to probe, scan, or test the vulnerability of the Products or any other Alpha IGI system or network or breach any security or authentication measures.</Text>
        </View>
        <Text style={styles.bodyText}>7.7</Text>
        <Text style={styles.paraText}>We are entitled to identify you to third parties who claim that their rights have been infringed by User Material you have submitted.</Text>
        <Text style={styles.bodyText}>7.8</Text>
        <Text style={styles.paraText}> User Material is not considered to be confidential. You agree not to submit any content as User Material in which you have any expectation of privacy. We do not claim any ownership rights in User Material. However, by submitting User Material you hereby grant Alpha IGI an irrevocable, perpetual, non-exclusive, royalty free, worldwide license to use, telecast, copy, perform, display, edit, distribute and otherwise exploit the User Material you post on the Products, or any portion thereof, and any ideas, concepts, or know how contained therein, with or without attribution, and without the requirement of any permission from or payment to you or to any other person or entity, in any manner (including, without limitation, for commercial, publicity, trade, promotional, or advertising purposes) and in any and all media now known or hereafter devised, and to prepare derivative works of, or incorporate into other works, such User Material, and to grant and authorize sublicenses of the foregoing without any payment of money or any other form of consideration to you or to any third party. Alpha IGI may include your User Material in Alpha IGI’s Distribution Content that is made available to others through the Products. Be aware that Alpha IGI has no control over User Material once it leaves the Products, and it is possible that others may duplicate material found on the Products, including, but not limited to, on other sites on the Internet. You represent and warrant that you own or otherwise control the rights to your User Material. You agree to indemnify Alpha IGI and its affiliates for all claims arising from or in connection with any claims to any rights in your User Material or any damages arising from your User Material.</Text>
        <Text style={styles.bodyText}>7.9 </Text>
        <Text style={styles.paraText}>Any inquiries, feedback, suggestions, ideas, other information which is not part of your use of the Products or User Material that you provide to us (collectively, “Submissions”) will be treated as non-proprietary and non-confidential. By transmitting, uploading, posting, e-mailing, or otherwise submitting Submissions to the Products, you grant, and you represent and warrant that you have the right to grant, to Alpha IGI an irrevocable, perpetual, non-exclusive, royalty free, worldwide license to use, telecast, copy, perform, display, edit, distribute and otherwise exploit the Submissions, or any portion thereof and any ideas, concepts, or know how contained therein, with or without attribution, and without the requirement of any permission from or payment to you or to any other person or entity, in any manner (including, without limitation, for commercial, publicity, trade, promotional, or advertising purposes) and in any and all media now known or hereafter devised, and to prepare derivative works of, or incorporate into other works, such Submissions, and to grant and authorize sublicenses of the foregoing without any payment of money or any other form of consideration to you or to any third party. You also acknowledge that your Submissions will not be returned to you and that Alpha IGI has no obligation to acknowledge receipt of or respond to any Submissions. If you make a Submission, you represent and warrant that you own or otherwise control the rights to your Submission. You agree to indemnify Alpha IGI and its affiliates for all claims arising from or in connection with any claims to any rights in any Submission or any damages arising from any Submission.</Text>
        <Text style={styles.headingText}>8. LINKS TO WEBSITES/HOME PAGE</Text>


        <Text style={styles.bodyText}>8.1</Text>
        <Text style={styles.paraText}> We may provide links to other websites or services for you to access. You acknowledge that any access is at your sole discretion and for your information only. We do not review or endorse any of those websites or services. We are not responsible in any way for:(a) the availability of, (b) the privacy practices of, (c) the content, advertising, products, goods or other materials or resources on or available from, or (d) the use to which others make of these other websites or services. We are also not responsible for any damage, loss or offense caused or alleged to be caused by, or in connection with, the use of or reliance on such websites or services.</Text>
        <Text style={styles.bodyText}>8.2</Text>
        <Text style={styles.paraText}>You may link to our home page, provided you do so in a way that is fair and legal and does not damage our reputation or take advantage of it, but you must not establish a link in such a way as to suggest any form of association, approval or endorsement on our part where none exists. You must not establish a link from any website that is not owned by you. The Products must not be framed on any other website, nor may you create a link to any part of the Products unless you have written permission to do so from Alpha IGI. We reserve the right to withdraw linking permission with written notice. The website from which you are linking must comply in all respects with the content standards set out in our acceptable use policy. If you wish to make any use of material on or in the Products other than that set out above, please address your request to support@alphaigi.com.</Text>
        <Text style={styles.headingText}>9. PRODUCTS DISCLAIMER</Text>
        <Text style={styles.paraText}>The information contained in the Products is for general information purposes only. While we endeavor to keep the information up-to-date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the Products or the information contained on the Products for any purpose. Any reliance you place on such information is therefore strictly at your own risk.</Text>
        <Text style={styles.headingText}>10. MEDICAL DISCLAIMER</Text>


        <Text style={styles.bodyText}>10.1 </Text><Text style={styles.paraText}>Alpha IGI is a provider of online and mobile app for services in health & wellness space. We are not a health care or medical device provider, nor should our Products be considered medical advice. Only your physician or other health care provider can do that. While there is third party evidence from research that meditation can assist in the prevention and recovery process for a wide array of conditions as well as in improving some performance and relationship issues, Alpha IGI makes no claims, representations or guarantees that the Products provide a physical or therapeutic benefit.</Text>
        <Text style={styles.bodyText}>10.2</Text>
        <Text style={styles.paraText}> Any health information and links on the Products, whether provided by Alpha IGI or by contract from outside providers, is provided simply for your convenience.</Text>
        <Text style={styles.bodyText}>10.3</Text>
        <Text style={styles.paraText}> To the extent that you participate in any movement content featured in the Products (“Alpha IGI Move Mode”), you represent and warrant that you are in adequate physical health to perform such activities and have no disability or condition that would make such movement dangerous. You should consult a licensed physician prior to beginning or modifying any exercise program that you undertake, including Alpha IGI Move Mode, especially if you have a prior injury, a history of heart disease, high blood pressure, other chronic illness, or condition. You acknowledge that Alpha IGI has advised you of the necessity of doing so.</Text>
        <Text style={styles.bodyText}>10.4</Text>
        <Text style={styles.paraText}> Any advice or other materials in the Products are intended for general information purposes only. They are not intended to be relied upon and are not a substitute for professional medical advice based on your individual condition and circumstances. The advice and other materials we make available are intended to support the relationship between you and your healthcare providers and not replace it. We are not liable or responsible for any consequences of your having read or been told about such advice or other materials as you assume full responsibility for your decisions and actions. In particular, to the fullest extent permitted by law, we make no representation or warranties about the accuracy, completeness, or suitability for any purpose of the advice, other materials and information published as part of the Products.</Text>
        <Text style={styles.bodyText}>10.5</Text>
        <Text style={styles.paraText}>There have been rare reports where people with certain psychiatric problems like anxiety and depression have experienced worsening conditions in conjunction with intensive meditation practice. People with existing mental health conditions should speak with their health care providers before starting a meditation practice.</Text>
        <Text style={styles.headingText}>11. END USER LICENSE</Text>
        <Text style={styles.bodyText}>11.1 </Text>
        <Text style={styles.paraText}>Subject to the terms of this license agreement (“License Agreement”), as set out in this section 11, and these other Terms, and your payment of applicable subscription fees, Alpha IGI grants you a limited, non-exclusive, revocable license to stream, download and make personal non-commercial use of the Products.</Text>
        <Text style={styles.bodyText}>11.2 </Text>
        <Text style={styles.paraText}>The Products contain or embody copyrighted material, proprietary material or other intellectual property of Alpha IGI or its licensors. All right, title and ownership in the Products remain with Alpha IGI or its licensors, as applicable. The rights to download and use the Products are licensed to you and are not being sold to you, and you have no rights in them other than to use them in accordance with this License Agreement and our other Terms.</Text>
        <Text style={styles.bodyText}>11.3</Text>

        <Text style={styles.paraText}> You agree that you will not and you will not assist or permit any third party to:</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>(a) Copy, store, reproduce, transmit, modify, alter, reverse-engineer, emulate, de-compile, or disassemble the Products in any way, or create derivative works of the Products;</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>(b) Use the Products or any part of them to create any tool or software product that can be used to create software applications of any nature whatsoever;</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>(c) Rent, lease, loan, make available to the public, sell or distribute the Products in whole or in part;</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>(d) Tamper with the Products or circumvent any technology used by Alpha IGI or its licensors to protect any content accessible through the Products;</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>(e) Circumvent any territorial restrictions applied to the Products; or</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>(f) Use the Products in a way that violates this License Agreement or the other Terms.</Text>
        </View>
        <Text style={styles.bodyText}>11.4</Text>
        <Text style={styles.paraText}> You may not make the Products available to the public. The Products made available (in whole or in part) are owned by Alpha IGI or its licensors and your use of them must be in accordance with these Terms.</Text>
        <Text style={styles.headingText}>12. DIGITAL MILLENIUM COPYRIGHT ACT (“DMCA”) NOTICE</Text>
        <Text style={styles.bodyText}>12.1</Text>

        <Text style={styles.paraText}> We are committed to complying with copyright and related laws, and we require all users of the Products to comply with these laws. Accordingly, you may not store any material or content on, or disseminate any material or content over, the Products in any manner that constitutes an infringement of third party intellectual property rights, including rights granted by copyright law. Owners of copyrighted works in theSingapore who believe that their rights under copyright law have been infringed may take advantage of certain provisions of the Singapore Digital Millennium Copyright Act of 1998 (the “DMCA”) to report alleged infringements. You may not post, modify, distribute, or reproduce in any way any copyrighted material, trademarks, or other proprietary information belonging to others without obtaining the prior written consent of the owner of such proprietary rights. It is our policy to terminate privileges of any user who repeatedly infringes the copyright rights of others upon receipt of proper notification to us by the copyright owner or the copyright owner’s legal agent.</Text>
        <Text style={styles.bodyText}>12.2</Text>
        <Text style={styles.paraText}>If you feel that a posted message is objectionable or infringing, we encourage you to contact us immediately. Upon our receipt of a proper notice of claimed infringement under the DMCA, we will respond expeditiously to remove, or disable access to, the material claimed to be infringing and will follow the procedures specified in the DMCA to resolve the claim between the notifying party and the alleged infringer who provided the content in issue. Our designated agent (i.e., the proper party) to whom you should address such notice is listed below.</Text>
        <Text style={styles.bodyText}>12.3</Text>
        <Text style={styles.paraText}> If you believe that your work has been copied and posted on the Products in a way that constitutes copyright infringement, please provide our designated agent with the following information:</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>(a) An electronic or physical signature of the person authorized to act on behalf of the owner of the copyright or other intellectual property interest;</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>(b) A description of the copyrighted work or other intellectual property that you claim has been infringed;</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>(c) A description of where the material that you claim is infringing is located on the Products;</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>(d) Your address, telephone number, and email address;</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>(e) A statement by you that you have a good faith belief that the disputed use is not authorized by the copyright or intellectual property owner, its agent, or the law; and</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>(f) A statement by you, made under penalty of perjury, that the information contained in your report is accurate and that you are the copyright or intellectual property owner or authorized to act on the copyright or intellectual property owner’s behalf.</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>(g) Our designated agent for notice of claims of copyright infringement can be reached as follows:
            By E-Mail: support@alphaigi.com Subject line: DMCA</Text>
        </View>
        <Text style={styles.headingText}>13. GENERAL TERMS AND CONDITIONS</Text>
        <Text style={styles.bodyText}>13.1 ASSIGNMENT BY US</Text>
        <Text style={styles.paraText}>Alpha IGI may transfer its rights and obligations under these Terms to any company, firm or person at any time if it does not materially affect your rights under it. You may not transfer your rights or obligations under these Terms to anyone else. These Terms are personal to you and no third party is entitled to benefit under these Terms except as set out here.</Text>
        <Text style={styles.bodyText}>13.2 INDEMNITY BY YOU</Text>
        <Text style={styles.paraText}>You agree to defend, indemnify and hold Alpha IGI and its directors, officers, members, investors, managers, employees and agents harmless from any and all claims, liabilities, costs and expenses, including reasonable attorneys’ fees, arising in any way from (i) your negligent, reckless, or willful misuse of the Products, (ii) your placement or transmission of any message, content, information, software, or other submissions through the Products, (iii) any third-party claims of bodily injury, death, or damage to real or tangible personal property caused by your negligent or more culpable acts or omissions related to your use of the Products; or (iv) your breach or violation of the law or of these Terms. Alpha IGI reserves the right, at its own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, and in such case, you agree to cooperate with Alpha IGI defense of such claim.</Text>
        <Text style={styles.bodyText}>13.3 WARRANTIES AND LIMITATIONS</Text>
        <Text style={styles.paraText}>(a) This warranty gives you specific legal rights, and you may also have other rights which vary from state to state.
          (b) We warrant to you that any Product purchased from us will, on delivery, conform in all material respects with its description and be of reasonably satisfactory quality.
          (c) We warrant that we will use reasonable skill and care in making the Products available to you during your subscription.
          (d) Notwithstanding anything to the contrary, you assume full responsibility for your own use of the Products. In no event shall Alpha IGI be liable to you, your heirs, or assigns or to any third party for any loss, death, damage, or bodily injury that you suffer, or that you cause to any third party, in connection with your use of the Products or other activities you undertake in connection with your use of the Products, unless caused by Alpha IGI’s gross negligence, recklessness, or willful misconduct.
          (e) The Products and their content are otherwise provided on an “as is” basis and we make no representations or warranties of any kind with respect to them, including as to the accuracy, completeness or currency of the Products or their content. We assume no liability or responsibility for any errors or omissions in the content of the Products, or any failures, delays, or interruptions in the provision of the Products. We disclaim and exclude any express or implied warranties or representations, including any warranties as to merchantability or fitness for a particular purpose of the Products to the broadest extent permitted by law. We make no warranties or representations, express or implied, as to the timeliness, accuracy, quality, completeness or existence of the content and information posted on the Products. We make no warranties or representations, express or implied, for technical accessibility, fitness or flawlessness of the Products. We make no warranties or representations that your use of content and information posted on the Products will not infringe rights of third parties.
          (f) All conditions, warranties and other terms which might otherwise be implied by statute, common law or the law of equity are, to the extent permitted by law, excluded.</Text>
        <Text style={styles.bodyText}>13.4 NO WAIVER</Text>
        <Text style={styles.paraText}>If we delay exercising or fail to exercise or enforce any right available to us under these Terms, such delay or failure does not constitute a waiver of that right or any other rights under these Terms.</Text>
        <Text style={styles.bodyText}>13.5 FORCE MAJEURE</Text>
        <Text style={styles.paraText}>We will not be liable to you for any lack of performance, or the unavailability or failure, of the Products, or for any failure or delay by us to comply with these Terms, where such lack, unavailability or failure arises from any cause beyond our reasonable control.</Text>
        <Text style={styles.bodyText}>13.6 INTERPRETATION</Text>
        <Text style={styles.paraText}>In these Terms, unless the context requires otherwise: (i) any phrase introduced by the words “including”, “include”, “in particular”, “for example” or any similar expression shall be construed as illustrative only and shall not be construed as limiting the generality of any preceding words; and (ii) references to the singular include the plural and to the masculine include the feminine, and in each case vice versa.</Text>
        <Text style={styles.bodyText}>13.7 ELECTRONIC COMMUNICATIONS</Text>

        <Text style={styles.paraText}>(a) Applicable laws require that some of the information or communications we send to you should be in writing. When using the Products, you agree to transact with us electronically, and that communication with us will be mainly electronic. We will contact you by e-mail or provide you with information by posting notices on the Products. You agree to this electronic means of communication and you acknowledge that all contracts, notices, information and other communications that we provide to you electronically comply with any legal requirement that such communications be in writing.
          (b) In order to retain a copy, please select “Print,” and select the appropriate printer. If you do not have a printer, you can copy the text and the underlying agreement(s) and paste them into a new document in a word processor or a text editor on your computer and save the text.
          (c) You have the right to receive a paper copy of the communications. To receive a paper copy, please request it by emailing us at support@alphaigi.com
          (d) We may charge you a reasonable service charge to mail you a paper copy of any communication. We will either include such service charge on our fee schedule or we will first inform you of the charge and provide you with the choice as to whether you still want us to send you a paper copy. Please be sure to state that you are requesting a copy of the particular communication.
          (e) To receive and view an electronic copy of the communications you must have the following equipment and software:</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>(i) A personal computer or other device which is capable of accessing the Internet. Your access to this page verifies that your system/device meets these requirements.</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>(ii) an Internet web browser which is capable of supporting 128-bit SSL encrypted communications, JavaScript, and cookies. Your system or device must have 128-bit SSL encryption software. Your access to this page verifies that your browser and encryption software/device meet these requirements.
            (f) To retain a copy, you must either have a printer connected to your personal computer or other device or, alternatively, the ability to save a copy through use of printing service or software such as Adobe Acrobat®. If you have a word processor or text editor program on your computer, then you can also copy the text and paste the text into a new document in the word processor or text editor and save the text.
            (g) You can also contact us via email at support@alphaigi.com to unsubscribe from further communications. Unsubscribing from communication may impact your ability to use the Products.
            (h) We reserve the right, in our sole discretion, to discontinue the provision of your electronic communications, or to terminate or change the terms and conditions on which we provide electronic communications. We will provide you with notice of any such termination or change as required by law.</Text>
        </View>
        <Text style={styles.bodyText}>13.8 NOTICES</Text>
        <Text style={styles.paraText}>Unless otherwise specifically indicated, all notices given by you to us must be given to Alpha IGI at help@alphaigi.com. We may give notice to you at the e-mail address you provide to us when you register, or in any of the ways specified in section 13.7 above. Notice will be deemed received and properly served immediately when posted on the Products or when an e-mail or other electronic communication is sent. In proving the service of any notice via email, it will be sufficient to prove that such e-mail was sent to the specified e-mail address of the addressee.</Text>
        <Text style={styles.bodyText}>13.9 ENTIRE AGREEMENT</Text>
        <Text style={styles.paraText}>These Terms and any document expressly referred to in them constitute the whole agreement between us and supersede all previous discussions, correspondence, negotiations, previous arrangement, understanding or agreement between us relating to their subject matter. We each acknowledge that neither of us relies on, or will have any remedies in respect of, any representation or warranty (whether made innocently or negligently) that is not set out in these Terms or the documents referred to in them. Each of us agrees that our only liability in respect of those representations and warranties that are set out in this agreement (whether made innocently or negligently) will be for breach of contract. Nothing in this section limits or excludes any liability for fraud.</Text>
        <Text style={styles.bodyText}>13.10 THIRD PARTY RIGHTS</Text>
        <Text style={styles.paraText}>A person who is not party to these Terms will not, subject to section 12 (DMCA), have any rights under or in connection with these Terms.</Text>
        <Text style={styles.bodyText}>13.11 LIMITATION OF Alpha IGI’S LIABILITY</Text>
        <Text style={styles.paraText}>(a) We will use reasonable endeavors to remedy faults in the Products. If we fail to comply with these Terms, your sole and exclusive remedies and our entire obligation and liability to you will in no circumstances exceed the actual amount paid by you for the Products in question. In addition, we will not be liable for:</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>(i) Faulty operation of computers during the registration process or during completion of a subscription or during the transmission of any data and/or for incorrect or overly slow transmission of data by the internet provider and/or any damage that occurs due to information submitted by you not being received by us or not being received promptly or not being considered, as a consequence of technical faults with our software or hardware (whether or not they are within or outside of our control).</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>(ii) Any loss or damage due to viruses or other malicious software that may infect your Device, computer equipment, software, data or other property caused by you accessing, using or downloading from the Products, or from transmissions via emails or attachments received from us.</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 8 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>(iii) Any use of websites linked to the Products but operated by third parties.
            (b) TO THE FULLEST EXTENT PERMITTED BY LAW, Alpha IGI AND ITS AFFILIATES, SUPPLIERS, CLIENTS OR LICENSORS (COLLECTIVELY, THE “PROTECTED ENTITIES”) SHALL NOT BE LIABLE FOR ANY CONSEQUENTIAL, INCIDENTAL, SPECIAL, EXEMPLARY OR PUNITIVE DAMAGES OR LOSSES, WHETHER DIRECT OR INDIRECT, ARISING FROM OR DIRECTLY OR INDIRECTLY RELATED TO, THE USE OF, OR THE INABILITY TO USE, THE PRODUCTS OR THE CONTENT, MATERIALS AND FUNCTIONS RELATED THERETO, YOUR PROVISION OF INFORMATION VIA THE PRODUCTS, OR LOST BUSINESS OR LOST SALES, OR ANY ERRORS, VIRUSES OR BUGS CONTAINED IN THE PRODUCTS, EVEN IF SUCH PROTECTED ENTITY HAS BEEN ADVISED OF THE POSSIBILTY OF SUCH DAMAGES. IN NO EVENT SHALL THE PROTECTED ENTITIES BE LIABLE FOR OR IN CONNECTION WITH ANY CONTENT POSTED, TRANSMITTED, EXCHANGED OR RECEIVED BY OR ON BEHALF OF ANY USER OR OTHER PERSON OR THROUGHOUT THE PRODUCTS. IN NO EVENT SHALL THE TOTAL AGGREGATE LIABILITY OF THE PROTECTED ENTITIES TO YOU FOR ALL DAMAGES, LOSSES AND CAUSES OF ACTION (WHETHER IN CONTRACT OR TORT, INCLUDING BUT NOT LIMITED TO, NEGLIGENCE OR OTHERWISE) ARISING FROM THESE TERMS OF USE OR YOUR USE OF THE PRODUCTS EXCEED, IN THE AGGREGATE, THE ACTUAL AMOUNT, IF ANY, PAID BY YOU TO Alpha IGI FOR YOUR USE OF THE PRODUCTS IN QUESTION.
            (c) Notwithstanding anything to the contrary, you assume full responsibility for your own use of the Products. In no event shall Alpha IGI be liable to you, your heirs, or assigns or to any third party for any loss, death, damage, or bodily injury that you suffer, or that you cause to any third party, in connection with your use of the Products or other activities you undertake in connection with your use of the Products.
            Some states do not allow the exclusion or limitation of incidental or consequential damages, so the above limitation or exclusion may not apply to you.</Text>
        </View>
        <Text style={styles.bodyText}>13.12 ARBITRATION</Text>
        <Text style={styles.paraText}>DISPUTE RESOLUTION AND BINDING ARBITRATION PLEASE READ THE FOLLOWING PARAGRAPHS CAREFULLY, AS THEY REQUIRE YOU TO ARBITRATE DISPUTES WITH Alpha IGI, AND LIMIT THE MANNER IN WHICH YOU CAN SEEK RELIEF FROM Alpha IGI INCLUDING A LIMITATION ON THE RIGHT TO LITIGATE CLAIMS IN A COURT OR BEFORE A JURY OR TO PARTICIPATE IN A CLASS ACTION OR REPRESENTATIVE ACTION WITH RESPECT TO A CLAIM.
          (a) Applicability of Arbitration Agreement. All disputes arising out of, relating to, or in connection with these Terms or your use of the Products that cannot be resolved informally or in small claims court will be resolved through binding arbitration on an individual basis, except that you and Alpha IGI are not required to arbitrate any dispute in which either party seeks equitable relief for the alleged unlawful use of copyrights, trademarks, trade names, logos, trade secrets, or patents.
          (b) Arbitration Rules. The Federal Arbitration Act governs the interpretation and enforcement of this dispute-resolution provision. Arbitration will be initiated through the American Arbitration Association ("AAA"). If the AAA is not available to arbitrate, the parties will select an alternative arbitral forum. The rules of the arbitral forum will govern all aspects of this arbitration, except to the extent those rules conflict with these Terms. The AAA Consumer Arbitration Rules (“AAA Rules”) governing the arbitration are available online at www.adr.org or by calling the AAA at 1-800-778-7879. The arbitration will be conducted by a single neutral arbitrator.
          If the claim is for $10,000 or less, the party initiating the arbitration may choose whether the arbitration will be conducted (1) solely on the basis of documents submitted to the arbitrator; (2) through a non-appearance based telephonic hearing; or (3) by an in-person hearing as established by the AAA Rules in the county of your billing address. In the case of an in-person hearing, the proceedings will be conducted at a location which is reasonably convenient for both parties with due consideration of the ability to travel and other pertinent circumstances. If the parties are unable to agree on a location, the determination will be made by the arbitration institution.
          Your arbitration fees and your share of arbitrator compensation will be limited to those fees set forth in the AAA Rules with the remainder paid by Alpha IGI. If the arbitrator finds that either the substance of your claim or the relief sought in the arbitration is frivolous or brought for an improper purpose (as measured by the standards set forth in Federal Rule of Civil Procedure 11(b)), then the payment of all fees will be governed by the AAA Rules. In such case, you agree to reimburse Alpha IGI for all monies previously disbursed by it that are otherwise your obligation to pay under the AAA Rules. Regardless of the manner in which the arbitration is conducted, the arbitrator shall issue a reasoned written decision sufficient to explain the essential findings and conclusions on which the decision and award, if any, are based. The arbitrator may make rulings and resolve disputes as to the payment and reimbursement of fees or expenses at any time during the proceeding and upon request from either party made within 14 days of the arbitrator’s ruling on the merits.
          (c) Authority of Arbitrator. The arbitrator will have exclusive authority to decide the jurisdiction of the arbitrator, including any unconscionability challenge or other challenge that the arbitration provision or the Agreement is void, voidable, or otherwise invalid. The arbitrator shall also have the exclusive authority to determine the rights and liabilities, if any, of you and Alpha IGI. The dispute will not be consolidated with any other matters or joined with any other cases or parties. The arbitrator will have the authority to grant motions dispositive of all or part of any claim or dispute. The arbitrator will have the authority to award all remedies available under applicable law, the arbitral forum's rules, and the Terms. The arbitrator has the same authority to award relief on an individual basis that a judge in a court of law would have. The award of the arbitrator is final and binding upon you and Alpha IGI.
          (d) Jury Trial Waiver. Except where not permitted by law, you and Alpha IGI waive any constitutional and statutory rights to go to court and have a trial in front of a judge or a jury. Rather, you and Alpha IGI elect to have claims and disputes resolved by arbitration. In any litigation between you and Alpha IGI over whether to vacate or enforce an arbitration award, you and Alpha IGI waive all rights to a jury trial, and elect instead to have the dispute be resolved by a judge.
          (e) Class Action Waiver. WHERE PERMITTED UNDER THE APPLICABLE LAW, YOU AND Alpha IGI AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR OUR INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR CONSOLIDATED ACTION. If, however, this waiver of class or consolidated actions is deemed invalid or unenforceable, neither you nor Alpha IGI are entitled to arbitration; instead all claims and disputes will be resolved in a court as set forth in section 13.13 below.
          (f) Opt-out. YOU MAY OPT-OUT OF THIS ARBITRATION AGREEMENT. If you do so, neither you nor Alpha IGI can force the other to arbitrate. To opt-out, you must notify Alpha IGI in writing no later than 30 days after first becoming subject to this arbitration agreement. Your notice must include your name and address, and the email address you used to set up your Alpha IGI account (if you have one), and an unequivocal statement that you want to opt-out of this arbitration agreement. You must send your opt-out notice to one of the following physical or email addresses: Alpha IGI ATTN: Arbitration Opt-out, [ADDRESS],; support@alphaigi.com
          (g) Small Claims Court. Notwithstanding the foregoing, either you or Alpha IGI may bring an individual action in small claims court.
          (h) Public Injunction Exclusion. Notwithstanding the foregoing, you may pursue a claim for public injunctive relief either in court or through arbitration.
          (i) Arbitration Agreement Survival. This arbitration agreement will survive the termination of your relationship with Alpha IGI.</Text>
        <Text style={styles.bodyText}>13.13 EXCLUSIVE VENUE</Text>
        <Text style={styles.paraText}>To the extent the parties are permitted under these Terms to initiate litigation in a court, both you and Alpha IGI agree that all claims and disputes arising out of or relating to the Terms or the use of the Products will be litigated exclusively in the Singapore court. If, however, that court would lack original jurisdiction over the litigation, then all claims and disputes arising out of or relating to the Terms or the use of the Products will be litigated exclusively in the Singapore. You and Alpha IGI consent to the personal jurisdiction of both courts.</Text>
        <Text style={styles.bodyText}>13.14 CHOICE OF LAW</Text>
        <Text style={styles.paraText}>Except to the extent they are preempted by the laws of Singapore, other than its conflict-of-laws principles, govern these Terms and any disputes arising out of or relating to these Terms or their subject matter, including tort claims.</Text>
        <Text style={styles.bodyText}>13.15 SEVERABILITY</Text>
        <Text style={styles.paraText}>If any provision of these Terms is found unenforceable, then that provision will be severed from these Terms and not affect the validity and enforceability of any remaining provisions.
          These Terms are effective and were last updated on Jul. 24, 2023.</Text>

      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.rejectButton}
          onPress={handlePress}  // Make sure handlePress is properly bound
        >
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.agreeButton} onPress={handlePress}>
          <Text style={styles.buttonText}>Agree</Text>
        </TouchableOpacity>
      </View>
      {/* </ImageBackground> */}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    ...Platform.select({
      ios: {
        paddingTop: 50, // Adjust for iOS status bar
      },
      android: {
        paddingTop: 0, // No additional padding for Android
      },
    }),
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    ...Platform.select({
      ios: {
        marginBottom: 50, // More bottom space on iOS
      },
      android: {
        marginBottom: 30, // Less bottom space on Android
      },
    }),
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#5F259F',
    textAlign: 'center',
    paddingVertical: 15,
    top: 10,
  },
  headingText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#5F259F',
    textAlign: 'center',
    paddingVertical: 6,
  },
  bodyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5F259F',
    marginBottom: 10,
    top: 5,
    ...Platform.select({
      ios: {
        fontFamily: 'Arial', // Use Arial font on iOS
      },
      android: {
        fontFamily: 'Roboto', // Use Roboto font on Android
      },
    }),
  },
  paraText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#5F259F',
    marginBottom: 15,
    ...Platform.select({
      ios: {
        textAlign: 'justify', // Justify text for iOS
      },
      android: {
        textAlign: 'justify', // Ensure the same text alignment on Android
      },
    }),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    // You can apply a different footer background if needed using Platform.select
  },
  rejectButton: {
    backgroundColor: 'grey',
    paddingVertical: 12,
    borderRadius: 25,
    width: '40%',
    alignSelf: 'center',
    marginTop: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 5, // Elevation for Android
      },
    }),
  },
  agreeButton: {
    backgroundColor: '#5F259F',
    paddingVertical: 12,
    borderRadius: 25,
    width: '40%',
    alignSelf: 'center',
    marginTop: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 5, // Elevation for Android
      },
    }),
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TermsConditions;