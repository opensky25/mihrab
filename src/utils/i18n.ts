export type LanguageCode = 'en' | 'ar' | 'fr' | 'tr';

export interface LanguageOption {
  code: LanguageCode;
  nativeName: string;
  englishName: string;
  direction: 'ltr' | 'rtl';
  localeTag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', nativeName: 'English', englishName: 'English', direction: 'ltr', localeTag: 'en-US' },
  { code: 'ar', nativeName: 'العربية', englishName: 'Arabic', direction: 'rtl', localeTag: 'ar-SA' },
  { code: 'fr', nativeName: 'Français', englishName: 'French', direction: 'ltr', localeTag: 'fr-FR' },
  { code: 'tr', nativeName: 'Türkçe', englishName: 'Turkish', direction: 'ltr', localeTag: 'tr-TR' },
];

export interface Translations {
  brandName: string;
  nav: {
    home: string;
    sports: string;
    prayer: string;
    livetv: string;
    apps: string;
  };
  actions: {
    previewAdhan: string;
    fullStandings: string;
    adjustCityTimezone: string;
    manageShieldApps: string;
    openLiveTv: string;
    allStories: string;
    launchAdhanScreen: string;
    openSupplications: string;
    reset: string;
    launch: string;
    inspect: string;
    pinnedToHome: string;
    pinToHome: string;
    returnToLauncher: string;
    dismiss: string;
    backToLauncher: string;
  };
  status: {
    nextPrayer: string;
    inPrefix: string;
    adFree: string;
    promosBlocked: string;
    region: string;
  };
  home: {
    adhanBackdrop: string;
    simulateAdhan: string;
    nextScheduledPrayer: string;
    today: string;
    tomorrow: string;
    liveScoresFixtures: string;
    matchdaySubtitle: string;
    leaguesTracked: string;
    tvAppsTitle: string;
    tvAppsSubtitle: string;
    adFreeLaunch: string;
    geoRestricted: string;
    liveChannelsTitle: string;
    liveChannelsSubtitle: string;
    topNewsTitle: string;
    topNewsSubtitle: string;
  };
  sports: {
    title: string;
    subtitle: string;
    allLeagues: string;
    scoresSchedule: string;
    standings: string;
    all: string;
    live: string;
    upcoming: string;
    finished: string;
    emptyMatches: string;
    resetFilters: string;
    broadcast: string;
    club: string;
    form: string;
    reminders: string;
    remindMe: string;
    reminderSet: string;
    previewAlert: string;
    kickoffAlertLabel: string;
    kickoffApproaching: string;
    kickoffInMinutes: string;
    openSportsCenter: string;
  };
  prayer: {
    title: string;
    subtitle: string;
    activeTimeZone: string;
    todaysSchedule: string;
    next: string;
    adhanMode: string;
    bannerMode: string;
    offMode: string;
    test: string;
    worldwideCities: string;
    searchPlaceholder: string;
    noCitiesMatch: string;
    active: string;
    timezoneAdjustment: string;
    timezoneSubtitle: string;
    manualOffsetLabel: string;
    cityNative: string;
    calculationAuthority: string;
    asrMethod: string;
    standardAsr: string;
    hanafiAsr: string;
    adhanBackgrounds: string;
    adhanBackgroundsNote: string;
    postAdhanSupplications: string;
    fullScreenView: string;
    nextPrayerIn: string;
    previousPrayer: string;
    elapsed: string;
    names: {
      Fajr: string;
      Sunrise: string;
      Dhuhr: string;
      Asr: string;
      Maghrib: string;
      Isha: string;
    };
  };
  livetv: {
    title: string;
    subtitle: string;
    channelsPermitted: string;
    audioOn: string;
    muted: string;
    now: string;
    upNext: string;
    channelGuide: string;
    playing: string;
    newsBriefings: string;
    allCategories: string;
    published: string;
    adFreeEditorial: string;
  };
  settings: {
    title: string;
    subtitle: string;
    languageTitle: string;
    languageDesc: string;
    adFreeRulesTitle: string;
    blockedBadge: string;
    enabled: string;
    disabled: string;
    ruleNetflixLabel: string;
    ruleNetflixDesc: string;
    rulePrimeLabel: string;
    rulePrimeDesc: string;
    ruleHomeRecLabel: string;
    ruleHomeRecDesc: string;
    ruleTelemetryLabel: string;
    ruleTelemetryDesc: string;
    geoRegionTitle: string;
    geoRegionDesc: string;
    interceptedTitle: string;
    noBlockedRows: string;
    blockedTag: string;
    installedAppsTitle: string;
    lockedTag: string;
  };
  adhanOverlay: {
    adhanToneOn: string;
    muted: string;
    callToPrayer: string;
    supplicationsHeader: string;
    previousDua: string;
    nextDua: string;
    tabAdhan: string;
    tabSupplications: string;
  };
  appModal: {
    geoPolicy: string;
    permitted: string;
    blockedIn: string;
    adStripping: string;
    activeZeroBanners: string;
    leanbackIntent: string;
    launchedNote: string;
    launchAdFree: string;
    launched: string;
  };
  weather: {
    title: string;
    feelsLike: string;
    humidity: string;
    wind: string;
    liveSource: string;
    estimatedSource: string;
    forecast3Day: string;
    conditions: {
      clear: string;
      partlyCloudy: string;
      cloudy: string;
      fog: string;
      drizzle: string;
      rain: string;
      snow: string;
      storm: string;
    };
  };
}

export const TRANSLATIONS: Record<LanguageCode, Translations> = {
  en: {
    brandName: 'Mihrab TV',
    nav: {
      home: 'Home',
      sports: 'Sports',
      prayer: 'Prayer',
      livetv: 'Live TV',
      apps: 'Settings',
    },
    actions: {
      previewAdhan: 'Preview Adhan',
      fullStandings: 'Full Standings',
      adjustCityTimezone: 'Adjust City & Time Zone',
      manageShieldApps: 'Manage Settings & Shield',
      openLiveTv: 'Open Live TV',
      allStories: 'All Stories',
      launchAdhanScreen: 'Launch Adhan Screen',
      openSupplications: 'Open Post-Adhan Supplications',
      reset: 'Reset',
      launch: 'Launch',
      inspect: 'Inspect',
      pinnedToHome: 'Pinned to Home',
      pinToHome: 'Pin to Home',
      returnToLauncher: 'Return to Launcher',
      dismiss: 'Dismiss',
      backToLauncher: 'Back to Launcher',
    },
    status: {
      nextPrayer: 'Next Prayer',
      inPrefix: 'in',
      adFree: 'Ad-Free',
      promosBlocked: 'promos blocked',
      region: 'Region',
    },
    home: {
      adhanBackdrop: 'Adhan Backdrop',
      simulateAdhan: 'Simulate Adhan',
      nextScheduledPrayer: 'Next Scheduled Prayer',
      today: 'Today',
      tomorrow: 'Tomorrow',
      liveScoresFixtures: 'Live Scores & Fixtures',
      matchdaySubtitle: 'Matchday scoreboard · Ad-free broadcast guide',
      leaguesTracked: '4 Leagues Tracked',
      tvAppsTitle: 'TV Apps & Direct Launch',
      tvAppsSubtitle: 'Netflix & Prime Video promotional banners stripped',
      adFreeLaunch: 'Ad-Free Launch',
      geoRestricted: 'Geo-Restricted',
      liveChannelsTitle: 'Live Channels',
      liveChannelsSubtitle: 'Direct stream switching · Regional EPG',
      topNewsTitle: 'Top News',
      topNewsSubtitle: 'World, regional & sports briefings',
    },
    sports: {
      title: 'Sports Center',
      subtitle: 'Live match scores, upcoming broadcast schedules, and league standings',
      allLeagues: 'All Leagues',
      scoresSchedule: 'Scores & Schedule',
      standings: 'Standings',
      all: 'All',
      live: 'Live',
      upcoming: 'Upcoming',
      finished: 'Finished',
      emptyMatches: 'No matches match the current league and status filter.',
      resetFilters: 'Reset Sports Filters',
      broadcast: 'Broadcast',
      club: 'Club',
      form: 'Form',
      reminders: 'Reminders',
      remindMe: 'Remind Me',
      reminderSet: 'Reminder On',
      previewAlert: 'Test Alert',
      kickoffAlertLabel: 'Match Reminder',
      kickoffApproaching: 'Approaching kickoff',
      kickoffInMinutes: 'min to kickoff',
      openSportsCenter: 'Open Sports',
    },
    prayer: {
      title: 'Prayer Times, World Cities & Adhan',
      subtitle: 'Astronomical prayer calculations, global time zone adjustment, Adhan backgrounds & post-Adhan supplications',
      activeTimeZone: 'Active Time Zone',
      todaysSchedule: "Today's Schedule",
      next: 'Next',
      adhanMode: 'Adhan',
      bannerMode: 'Banner',
      offMode: 'Off',
      test: 'Test',
      worldwideCities: 'Worldwide Cities',
      searchPlaceholder: 'Search city, country, or IANA time zone (e.g. Tokyo, London, Cairo)...',
      noCitiesMatch: 'No cities match your search. Try clearing your filter.',
      active: 'Active',
      timezoneAdjustment: 'Time Zone & Method Adjustment',
      timezoneSubtitle: 'Fine-tune DST / regional time zone offsets and juristic calculation parameters',
      manualOffsetLabel: 'Manual Time Zone / DST Offset',
      cityNative: 'City Native (0m)',
      calculationAuthority: 'Prayer Calculation Authority',
      asrMethod: 'Asr Juristic Shadow Method',
      standardAsr: 'Standard (Shafi‘i / Maliki)',
      hanafiAsr: 'Hanafi',
      adhanBackgrounds: 'Adhan Islamic Backgrounds',
      adhanBackgroundsNote: 'Displayed full-screen during Adhan',
      postAdhanSupplications: 'Post-Adhan Supplications',
      fullScreenView: 'Full-Screen View',
      nextPrayerIn: 'Next Prayer Countdown',
      previousPrayer: 'Previous',
      elapsed: 'elapsed',
      names: {
        Fajr: 'Fajr',
        Sunrise: 'Sunrise',
        Dhuhr: 'Dhuhr',
        Asr: 'Asr',
        Maghrib: 'Maghrib',
        Isha: 'Isha',
      },
    },
    livetv: {
      title: 'Live Channels & News Desk',
      subtitle: 'Zero-ad live TV stream player and global headlines',
      channelsPermitted: 'channels permitted in',
      audioOn: 'Audio On',
      muted: 'Muted',
      now: 'Now',
      upNext: 'Up Next',
      channelGuide: 'Channel Guide',
      playing: 'Playing',
      newsBriefings: 'News Briefings',
      allCategories: 'All',
      published: 'Published',
      adFreeEditorial: 'Ad-free editorial feed',
    },
    settings: {
      title: 'Launcher Settings, Language & Geo-Shield',
      subtitle: 'Configure interface language, ad-free stripping for Netflix & Prime Video, regional access, and TV apps',
      languageTitle: 'Interface Language',
      languageDesc: 'Applies across navigation, prayer schedules, sports center, and settings with automatic RTL support for Arabic.',
      adFreeRulesTitle: 'Ad-Free Stripping Rules',
      blockedBadge: 'blocked',
      enabled: 'Enabled',
      disabled: 'Disabled',
      ruleNetflixLabel: 'Strip Netflix Promotional Banners & Auto-Trailers',
      ruleNetflixDesc: 'Prevents Netflix hero carousels and "Top Picks" sponsored shelves from appearing on the TV home screen.',
      rulePrimeLabel: 'Strip Prime Video Storefront & Freevee Ads',
      rulePrimeDesc: 'Removes Prime Video rental upsells and Amazon promotional rows, launching straight to your library.',
      ruleHomeRecLabel: 'Block Android TV Sponsored Recommendations',
      ruleHomeRecDesc: 'Suppresses Play Movies rental rows and third-party partner app discovery tiles.',
      ruleTelemetryLabel: 'Strip Launcher Telemetry & Watch-History Beacons',
      ruleTelemetryDesc: 'Keeps app launch history local without external ad-network profiling.',
      geoRegionTitle: 'Geo-Restriction Region',
      geoRegionDesc: 'Enforces regional broadcast rights across TV apps, live channels, and launcher feeds.',
      interceptedTitle: 'Intercepted & Blocked Promotional Rows',
      noBlockedRows: 'No promotional feeds currently blocked.',
      blockedTag: 'Blocked',
      installedAppsTitle: 'Installed TV Applications',
      lockedTag: 'Locked',
    },
    adhanOverlay: {
      adhanToneOn: 'Adhan Tone On',
      muted: 'Muted',
      callToPrayer: 'Call to Prayer',
      supplicationsHeader: 'Post-Adhan Supplications',
      previousDua: 'Previous Dua',
      nextDua: 'Next Dua',
      tabAdhan: 'Call to Prayer (Adhan)',
      tabSupplications: 'Post-Adhan Supplications',
    },
    appModal: {
      geoPolicy: 'Geo-Restriction Policy',
      permitted: 'Permitted',
      blockedIn: 'Blocked in',
      adStripping: 'Promotional Ad Stripping',
      activeZeroBanners: 'Active (Zero Banners)',
      leanbackIntent: 'Android TV Leanback Intent',
      launchedNote: 'Ad-free Leanback intent dispatched to',
      launchAdFree: 'Ad-Free Launch',
      launched: 'Launched',
    },
    weather: {
      title: 'Local Weather Forecast',
      feelsLike: 'Feels like',
      humidity: 'Humidity',
      wind: 'Wind',
      liveSource: 'Live weather',
      estimatedSource: 'Regional climate estimate',
      forecast3Day: '3-Day Outlook',
      conditions: {
        clear: 'Clear Sky',
        partlyCloudy: 'Partly Cloudy',
        cloudy: 'Overcast',
        fog: 'Foggy',
        drizzle: 'Light Drizzle',
        rain: 'Rain',
        snow: 'Snow',
        storm: 'Thunderstorm',
      },
    },
  },
  ar: {
    brandName: 'محراب TV',
    nav: {
      home: 'الرئيسية',
      sports: 'الرياضة',
      prayer: 'الصلاة',
      livetv: 'البث المباشر',
      apps: 'الإعدادات',
    },
    actions: {
      previewAdhan: 'معاينة الأذان',
      fullStandings: 'جدول الترتيب',
      adjustCityTimezone: 'ضبط المدينة والمنطقة الزمنية',
      manageShieldApps: 'إدارة الإعدادات والحماية',
      openLiveTv: 'فتح البث المباشر',
      allStories: 'جميع الأخبار',
      launchAdhanScreen: 'تشغيل شاشة الأذان',
      openSupplications: 'أدعية ما بعد الأذان',
      reset: 'إعادة ضبط',
      launch: 'تشغيل',
      inspect: 'معاينة',
      pinnedToHome: 'مثبت بالرئيسية',
      pinToHome: 'تثبيت بالرئيسية',
      returnToLauncher: 'العودة للشاشة الرئيسية',
      dismiss: 'إغلاق',
      backToLauncher: 'العودة',
    },
    status: {
      nextPrayer: 'الصلاة القادمة',
      inPrefix: 'بعد',
      adFree: 'بدون إعلانات',
      promosBlocked: 'إعلان محجوب',
      region: 'النطاق',
    },
    home: {
      adhanBackdrop: 'خلفية الأذان',
      simulateAdhan: 'تجربة الأذان',
      nextScheduledPrayer: 'الصلاة القادمة',
      today: 'اليوم',
      tomorrow: 'غداً',
      liveScoresFixtures: 'النتائج المباشرة والمباريات',
      matchdaySubtitle: 'لوحة النتائج · دليل البث بدون إعلانات',
      leaguesTracked: '٤ بطولات متابعة',
      tvAppsTitle: 'تطبيقات التلفاز والتشغيل المباشر',
      tvAppsSubtitle: 'تم حجب إعلانات نتفليكس وبرايم فيديو الترويجية',
      adFreeLaunch: 'تشغيل بدون إعلانات',
      geoRestricted: 'مقيد جغرافياً',
      liveChannelsTitle: 'القنوات المباشرة',
      liveChannelsSubtitle: 'تنقل سريع · دليل البرامج الإقليمي',
      topNewsTitle: 'أبرز الأخبار',
      topNewsSubtitle: 'موجز الأخبار العالمية والرياضية',
    },
    sports: {
      title: 'المركز الرياضي',
      subtitle: 'نتائج المباريات المباشرة، جداول البث القادمة، وترتيب الدوريات',
      allLeagues: 'كل البطولات',
      scoresSchedule: 'النتائج والجدول',
      standings: 'جدول الترتيب',
      all: 'الكل',
      live: 'مباشر',
      upcoming: 'قادمة',
      finished: 'منتهية',
      emptyMatches: 'لا توجد مباريات مطابقة للتصفية الحالية.',
      resetFilters: 'إعادة ضبط التصفية',
      broadcast: 'البث',
      club: 'النادي',
      form: 'السجل',
      reminders: 'التنبيهات',
      remindMe: 'تذكيري',
      reminderSet: 'تم التفعيل',
      previewAlert: 'تجربة التنبيه',
      kickoffAlertLabel: 'تذكير المباراة',
      kickoffApproaching: 'اقترب موعد الانطلاق',
      kickoffInMinutes: 'دقيقة على البداية',
      openSportsCenter: 'فتح الرياضة',
    },
    prayer: {
      title: 'مواقيت الصلاة، مدن العالم والأذان',
      subtitle: 'حسابات فلكية دقيقة، ضبط المناطق الزمنية عالمياً، خلفيات إسلامية للأذان وأدعية ما بعد الأذان',
      activeTimeZone: 'المنطقة الزمنية النشطة',
      todaysSchedule: 'مواقيت اليوم',
      next: 'التالي',
      adhanMode: 'أذان',
      bannerMode: 'تنبيه',
      offMode: 'إيقاف',
      test: 'تجربة',
      worldwideCities: 'مدن العالم',
      searchPlaceholder: 'ابحث عن مدينة أو دولة أو منطقة زمنية (مثل مكة، لندن، طوكيو)...',
      noCitiesMatch: 'لا توجد مدن مطابقة لبحثك.',
      active: 'نشط',
      timezoneAdjustment: 'ضبط المنطقة الزمنية وطريقة الحساب',
      timezoneSubtitle: 'تعديل فروق التوقيت الصيفي ومعايير الحساب الفقهي',
      manualOffsetLabel: 'تعديل يدوي للتوقيت / التوقيت الصيفي',
      cityNative: 'توقيت المدينة الأصلي (0د)',
      calculationAuthority: 'هيئة حساب المواقيت',
      asrMethod: 'مذهب وقت العصر',
      standardAsr: 'الجمهور (الشافعي / المالكي / الحنبلي)',
      hanafiAsr: 'الحنفي',
      adhanBackgrounds: 'الخلفيات الإسلامية للأذان',
      adhanBackgroundsNote: 'تُعرض بملء الشاشة أثناء رفع الأذان',
      postAdhanSupplications: 'أدعية ما بعد الأذان',
      fullScreenView: 'عرض بملء الشاشة',
      nextPrayerIn: 'العد التنازلي للصلاة القادمة',
      previousPrayer: 'السابقة',
      elapsed: 'منقضٍ',
      names: {
        Fajr: 'الفجر',
        Sunrise: 'الشروق',
        Dhuhr: 'الظهر',
        Asr: 'العصر',
        Maghrib: 'المغرب',
        Isha: 'العشاء',
      },
    },
    livetv: {
      title: 'القنوات المباشرة ومركز الأخبار',
      subtitle: 'مشغل بث تلفزيوني خالٍ من الإعلانات وعناوين الأخبار العالمية',
      channelsPermitted: 'قنوات متاحة في',
      audioOn: 'الصوت مفعل',
      muted: 'مكتوم',
      now: 'الآن',
      upNext: 'التالي',
      channelGuide: 'دليل القنوات',
      playing: 'يعرض الآن',
      newsBriefings: 'الموجز الإخباري',
      allCategories: 'الكل',
      published: 'نُشر',
      adFreeEditorial: 'موجز إخباري خالٍ من الإعلانات',
    },
    settings: {
      title: 'إعدادات المشغل، اللغة والحماية الجغرافية',
      subtitle: 'ضبط لغة الواجهة، حجب إعلانات نتفليكس وبرايم فيديو، القيود الجغرافية، وتطبيقات التلفاز',
      languageTitle: 'لغة الواجهة',
      languageDesc: 'تُطبق فوراً على القوائم ومواقيت الصلاة والمركز الرياضي والإعدادات مع دعم كامل للاتجاه من اليمين لليسار.',
      adFreeRulesTitle: 'قواعد حجب الإعلانات',
      blockedBadge: 'محجوب',
      enabled: 'مفعل',
      disabled: 'معطل',
      ruleNetflixLabel: 'إزالة إعلانات نتفليكس والعروض التلقائية',
      ruleNetflixDesc: 'يمنع ظهور لافتات نتفليكس الترويجية وصفوف الاختيارات المدفوعة على الشاشة الرئيسية.',
      rulePrimeLabel: 'إزالة إعلانات متجر برايم فيديو الترويجية',
      rulePrimeDesc: 'يزيل عروض الإيجار والشراء الترويجية في برايم فيديو ويفتح مكتبتك مباشرة.',
      ruleHomeRecLabel: 'حجب توصيات أندرويد TV المدعومة',
      ruleHomeRecDesc: 'يخفي صفوف Google Play Movies الترويجية وبطاقات الشركاء الممولة.',
      ruleTelemetryLabel: 'منع تتبع المشاهدة والبيانات الإعلانية',
      ruleTelemetryDesc: 'يبقي سجل تشغيل التطبيقات محلياً دون إرساله لشبكات الإعلان.',
      geoRegionTitle: 'النطاق الجغرافي المسموح',
      geoRegionDesc: 'يفرض حقوق البث الإقليمية عبر التطبيقات والقنوات المباشرة.',
      interceptedTitle: 'الصفوف الترويجية التي تم حجبها',
      noBlockedRows: 'لا توجد صفوف ترويجية محجوبة حالياً.',
      blockedTag: 'محجوب',
      installedAppsTitle: 'تطبيقات التلفاز المثبتة',
      lockedTag: 'مقيد',
    },
    adhanOverlay: {
      adhanToneOn: 'تنبيه الأذان مفعل',
      muted: 'صامت',
      callToPrayer: 'الأذان',
      supplicationsHeader: 'أدعية ما بعد الأذان',
      previousDua: 'الدعاء السابق',
      nextDua: 'الدعاء التالي',
      tabAdhan: 'نداء الأذان',
      tabSupplications: 'أدعية بعد الأذان',
    },
    appModal: {
      geoPolicy: 'سياسة التقييد الجغرافي',
      permitted: 'مسموح',
      blockedIn: 'محجوب في',
      adStripping: 'حجب الإعلانات الترويجية',
      activeZeroBanners: 'مفعل (بدون لافتات)',
      leanbackIntent: 'رابط تشغيل Android TV المباشر',
      launchedNote: 'تم إرسال أمر التشغيل النظيف إلى',
      launchAdFree: 'تشغيل بدون إعلانات',
      launched: 'تم التشغيل',
    },
    weather: {
      title: 'توقعات الطقس المحلية',
      feelsLike: 'المحسوسة',
      humidity: 'الرطوبة',
      wind: 'الرياح',
      liveSource: 'طقس مباشر',
      estimatedSource: 'تقدير مناخي محلي',
      forecast3Day: 'توقعات ٣ أيام',
      conditions: {
        clear: 'سماء صافية',
        partlyCloudy: 'غائم جزئياً',
        cloudy: 'غائم',
        fog: 'ضباب',
        drizzle: 'رذاذ خفيف',
        rain: 'أمطار',
        snow: 'ثلوج',
        storm: 'عاصفة رعدية',
      },
    },
  },
  fr: {
    brandName: 'Mihrab TV',
    nav: {
      home: 'Accueil',
      sports: 'Sports',
      prayer: 'Prières',
      livetv: 'TV en direct',
      apps: 'Paramètres',
    },
    actions: {
      previewAdhan: 'Aperçu Adhan',
      fullStandings: 'Classement',
      adjustCityTimezone: 'Ville et fuseau horaire',
      manageShieldApps: 'Paramètres et bouclier',
      openLiveTv: 'Ouvrir TV direct',
      allStories: 'Toutes les infos',
      launchAdhanScreen: 'Lancer écran Adhan',
      openSupplications: 'Invocations après Adhan',
      reset: 'Réinitialiser',
      launch: 'Lancer',
      inspect: 'Inspecter',
      pinnedToHome: 'Épinglé',
      pinToHome: 'Épingler',
      returnToLauncher: 'Retour accueil',
      dismiss: 'Fermer',
      backToLauncher: 'Retour',
    },
    status: {
      nextPrayer: 'Prochaine prière',
      inPrefix: 'dans',
      adFree: 'Sans pub',
      promosBlocked: 'pubs bloquées',
      region: 'Région',
    },
    home: {
      adhanBackdrop: 'Fond Adhan',
      simulateAdhan: 'Simuler Adhan',
      nextScheduledPrayer: 'Prochaine prière prévue',
      today: "Aujourd'hui",
      tomorrow: 'Demain',
      liveScoresFixtures: 'Scores en direct et matchs',
      matchdaySubtitle: 'Tableau des scores · Guide sans publicité',
      leaguesTracked: '4 ligues suivies',
      tvAppsTitle: 'Applications TV & lancement direct',
      tvAppsSubtitle: 'Bannières promo Netflix & Prime Video supprimées',
      adFreeLaunch: 'Lancement sans pub',
      geoRestricted: 'Géo-restreint',
      liveChannelsTitle: 'Chaînes en direct',
      liveChannelsSubtitle: 'Changement rapide · EPG régional',
      topNewsTitle: 'À la une',
      topNewsSubtitle: 'Actualités mondiales, régionales et sportives',
    },
    sports: {
      title: 'Centre Sportif',
      subtitle: 'Scores en direct, calendrier des diffusions et classements des ligues',
      allLeagues: 'Toutes les ligues',
      scoresSchedule: 'Scores et calendrier',
      standings: 'Classement',
      all: 'Tous',
      live: 'En direct',
      upcoming: 'À venir',
      finished: 'Terminés',
      emptyMatches: 'Aucun match ne correspond aux filtres sélectionnés.',
      resetFilters: 'Réinitialiser filtres',
      broadcast: 'Diffusion',
      club: 'Club',
      form: 'Forme',
      reminders: 'Rappels',
      remindMe: 'Me rappeler',
      reminderSet: 'Rappel actif',
      previewAlert: 'Tester alerte',
      kickoffAlertLabel: 'Rappel de match',
      kickoffApproaching: 'Coup d’envoi imminent',
      kickoffInMinutes: 'min avant le match',
      openSportsCenter: 'Voir Sports',
    },
    prayer: {
      title: 'Horaires de prière, villes & Adhan',
      subtitle: 'Calcul astronomique, ajustement mondial du fuseau horaire, fonds islamiques et invocations',
      activeTimeZone: 'Fuseau actif',
      todaysSchedule: "Horaires d'aujourd'hui",
      next: 'Suivante',
      adhanMode: 'Adhan',
      bannerMode: 'Bannière',
      offMode: 'Désactivé',
      test: 'Tester',
      worldwideCities: 'Villes du monde',
      searchPlaceholder: 'Rechercher une ville, un pays ou un fuseau IANA...',
      noCitiesMatch: 'Aucune ville trouvée pour cette recherche.',
      active: 'Actif',
      timezoneAdjustment: 'Fuseau horaire et méthode de calcul',
      timezoneSubtitle: "Ajustez les décalages horaires et les paramètres de calcul",
      manualOffsetLabel: 'Décalage manuel / heure d’été',
      cityNative: 'Natif ville (0m)',
      calculationAuthority: 'Méthode de calcul',
      asrMethod: 'École juridique pour Asr',
      standardAsr: 'Standard (Chaféite / Malikite)',
      hanafiAsr: 'Hanafite',
      adhanBackgrounds: 'Arrière-plans islamiques Adhan',
      adhanBackgroundsNote: "Affichés en plein écran pendant l'appel à la prière",
      postAdhanSupplications: 'Invocations après Adhan',
      fullScreenView: 'Plein écran',
      nextPrayerIn: 'Compte à rebours',
      previousPrayer: 'Précédente',
      elapsed: 'écoulé',
      names: {
        Fajr: 'Fajr',
        Sunrise: 'Lever',
        Dhuhr: 'Dhuhr',
        Asr: 'Asr',
        Maghrib: 'Maghrib',
        Isha: 'Isha',
      },
    },
    livetv: {
      title: 'Chaînes en direct et actualités',
      subtitle: 'Lecteur TV en direct sans publicité et dépêches mondiales',
      channelsPermitted: 'chaînes autorisées en',
      audioOn: 'Son activé',
      muted: 'Muet',
      now: 'En cours',
      upNext: 'À suivre',
      channelGuide: 'Guide des chaînes',
      playing: 'En lecture',
      newsBriefings: 'Dépêches',
      allCategories: 'Toutes',
      published: 'Publié',
      adFreeEditorial: 'Flux éditorial sans publicité',
    },
    settings: {
      title: 'Paramètres, langue et géo-bouclier',
      subtitle: 'Langue du lanceur, blocage des promos Netflix & Prime Video, géo-restriction et applications',
      languageTitle: "Langue de l'interface",
      languageDesc: "S'applique immédiatement à la navigation, aux prières, aux sports et aux paramètres.",
      adFreeRulesTitle: 'Règles anti-publicité',
      blockedBadge: 'bloquées',
      enabled: 'Activé',
      disabled: 'Désactivé',
      ruleNetflixLabel: 'Supprimer les bannières et bandes-annonces Netflix',
      ruleNetflixDesc: "Empêche les carrousels sponsorisés Netflix d'apparaître sur l'écran d'accueil.",
      rulePrimeLabel: 'Supprimer les offres et publicités Prime Video',
      rulePrimeDesc: 'Supprime les rangées commerciales Prime Video et ouvre directement votre bibliothèque.',
      ruleHomeRecLabel: 'Bloquer les recommandations sponsorisées Android TV',
      ruleHomeRecDesc: 'Masque les locations Play Films et les tuiles partenaires sponsorisées.',
      ruleTelemetryLabel: 'Supprimer la télémétrie et le suivi publicitaire',
      ruleTelemetryDesc: 'Conserve l’historique localement sans profilage externe.',
      geoRegionTitle: 'Région de géo-restriction',
      geoRegionDesc: 'Applique les droits de diffusion régionaux aux applications et chaînes.',
      interceptedTitle: 'Rangées promotionnelles interceptées',
      noBlockedRows: 'Aucune rangée promotionnelle bloquée actuellement.',
      blockedTag: 'Bloqué',
      installedAppsTitle: 'Applications TV installées',
      lockedTag: 'Verrouillé',
    },
    adhanOverlay: {
      adhanToneOn: 'Son Adhan activé',
      muted: 'Muet',
      callToPrayer: 'Appel à la prière',
      supplicationsHeader: 'Invocations après Adhan',
      previousDua: 'Dua précédente',
      nextDua: 'Dua suivante',
      tabAdhan: 'Appel à la prière (Adhan)',
      tabSupplications: 'Invocations après Adhan',
    },
    appModal: {
      geoPolicy: 'Politique de géo-restriction',
      permitted: 'Autorisé',
      blockedIn: 'Bloqué en',
      adStripping: 'Filtrage publicitaire',
      activeZeroBanners: 'Actif (Zéro bannière)',
      leanbackIntent: 'Intent Android TV Leanback',
      launchedNote: 'Intent sans publicité envoyé à',
      launchAdFree: 'Lancer sans pub',
      launched: 'Lancé',
    },
    weather: {
      title: 'Météo Locale',
      feelsLike: 'Ressenti',
      humidity: 'Humidité',
      wind: 'Vent',
      liveSource: 'Météo en direct',
      estimatedSource: 'Estimation climatique',
      forecast3Day: 'Prévisions sur 3 jours',
      conditions: {
        clear: 'Ciel dégagé',
        partlyCloudy: 'Partiellement nuageux',
        cloudy: 'Couvert',
        fog: 'Brouillard',
        drizzle: 'Bruine légère',
        rain: 'Pluie',
        snow: 'Neige',
        storm: 'Orage',
      },
    },
  },
  tr: {
    brandName: 'Mihrab TV',
    nav: {
      home: 'Ana Sayfa',
      sports: 'Spor',
      prayer: 'Namaz',
      livetv: 'Canlı TV',
      apps: 'Ayarlar',
    },
    actions: {
      previewAdhan: 'Ezan Önizle',
      fullStandings: 'Puan Durumu',
      adjustCityTimezone: 'Şehir ve Saat Dilimi',
      manageShieldApps: 'Ayarlar ve Koruma',
      openLiveTv: 'Canlı TV Aç',
      allStories: 'Tüm Haberler',
      launchAdhanScreen: 'Ezan Ekranını Aç',
      openSupplications: 'Ezan Sonrası Dualar',
      reset: 'Sıfırla',
      launch: 'Başlat',
      inspect: 'İncele',
      pinnedToHome: 'Sabitlendi',
      pinToHome: 'Ana Ekrana Sabitle',
      returnToLauncher: 'Ana Ekrana Dön',
      dismiss: 'Kapat',
      backToLauncher: 'Geri Dön',
    },
    status: {
      nextPrayer: 'Sonraki Vakit',
      inPrefix: 'kalan',
      adFree: 'Reklamsız',
      promosBlocked: 'reklam engellendi',
      region: 'Bölge',
    },
    home: {
      adhanBackdrop: 'Ezan Arka Planı',
      simulateAdhan: 'Ezanı Test Et',
      nextScheduledPrayer: 'Sıradaki Namaz Vakti',
      today: 'Bugün',
      tomorrow: 'Yarın',
      liveScoresFixtures: 'Canlı Skorlar ve Fikstür',
      matchdaySubtitle: 'Maç günü tablosu · Reklamsız yayın rehberi',
      leaguesTracked: '4 Lig Takip Ediliyor',
      tvAppsTitle: 'TV Uygulamaları ve Doğrudan Başlatma',
      tvAppsSubtitle: 'Netflix ve Prime Video tanıtım reklamları engellendi',
      adFreeLaunch: 'Reklamsız Açılış',
      geoRestricted: 'Bölge Kısıtlı',
      liveChannelsTitle: 'Canlı Kanallar',
      liveChannelsSubtitle: 'Hızlı kanal geçişi · Bölgesel EPG',
      topNewsTitle: 'Gündem Haberleri',
      topNewsSubtitle: 'Dünya, bölge ve spor özetleri',
    },
    sports: {
      title: 'Spor Merkezi',
      subtitle: 'Canlı maç skorları, yaklaşan yayın programı ve lig puan durumları',
      allLeagues: 'Tüm Ligler',
      scoresSchedule: 'Skorlar ve Program',
      standings: 'Puan Durumu',
      all: 'Tümü',
      live: 'Canlı',
      upcoming: 'Yaklaşan',
      finished: 'Tamamlanan',
      emptyMatches: 'Seçili lig ve durum filtresine uygun maç bulunamadı.',
      resetFilters: 'Filtreleri Sıfırla',
      broadcast: 'Yayın',
      club: 'Kulüp',
      form: 'Form',
      reminders: 'Hatırlatıcılar',
      remindMe: 'Hatırlat',
      reminderSet: 'Hatırlatıcı Açık',
      previewAlert: 'Uyarıyı Test Et',
      kickoffAlertLabel: 'Maç Hatırlatıcısı',
      kickoffApproaching: 'Başlama saati yaklaşıyor',
      kickoffInMinutes: 'dk kaldı',
      openSportsCenter: 'Sporu Aç',
    },
    prayer: {
      title: 'Namaz Vakitleri, Dünya Şehirleri ve Ezan',
      subtitle: 'Astronomik vakit hesaplama, küresel saat dilimi ayarı, İslami ezan görselleri ve ezan duaları',
      activeTimeZone: 'Aktif Saat Dilimi',
      todaysSchedule: 'Bugünün Vakitleri',
      next: 'Sıradaki',
      adhanMode: 'Ezan',
      bannerMode: 'Bildirim',
      offMode: 'Kapalı',
      test: 'Test',
      worldwideCities: 'Dünya Şehirleri',
      searchPlaceholder: 'Şehir, ülke veya saat dilimi ara (örn. İstanbul, Mekke, Londra)...',
      noCitiesMatch: 'Aramanızla eşleşen şehir bulunamadı.',
      active: 'Seçili',
      timezoneAdjustment: 'Saat Dilimi ve Hesaplama Yöntemi',
      timezoneSubtitle: 'Yaz saati farkını ve fıkhi hesaplama parametrelerini ayarlayın',
      manualOffsetLabel: 'Manuel Saat Dilimi / Yaz Saati Farkı',
      cityNative: 'Şehir Yerel (0dk)',
      calculationAuthority: 'Vakit Hesaplama Kurumu',
      asrMethod: 'İkindi Hesaplama Yöntemi',
      standardAsr: 'Standart (Şafii / Maliki)',
      hanafiAsr: 'Hanefi',
      adhanBackgrounds: 'İslami Ezan Arka Planları',
      adhanBackgroundsNote: 'Ezan okunurken tam ekran gösterilir',
      postAdhanSupplications: 'Ezan Sonrası Dualar',
      fullScreenView: 'Tam Ekran Görünüm',
      nextPrayerIn: 'Sonraki Vakte Kalan',
      previousPrayer: 'Önceki',
      elapsed: 'geçti',
      names: {
        Fajr: 'İmsak',
        Sunrise: 'Güneş',
        Dhuhr: 'Öğle',
        Asr: 'İkindi',
        Maghrib: 'Akşam',
        Isha: 'Yatsı',
      },
    },
    livetv: {
      title: 'Canlı Kanallar ve Haber Masası',
      subtitle: 'Reklamsız canlı TV oynatıcısı ve dünya gündemi',
      channelsPermitted: 'kanal izinli bölge:',
      audioOn: 'Ses Açık',
      muted: 'Sessiz',
      now: 'Şimdi',
      upNext: 'Sıradaki',
      channelGuide: 'Kanal Rehberi',
      playing: 'Oynatılıyor',
      newsBriefings: 'Haber Özetleri',
      allCategories: 'Tümü',
      published: 'Yayınlandı',
      adFreeEditorial: 'Reklamsız haber akışı',
    },
    settings: {
      title: 'Ayarlar, Dil ve Bölge Koruması',
      subtitle: 'Arayüz dilini, Netflix ve Prime Video reklam engellemesini, bölge kısıtlamasını ve TV uygulamalarını yönetin',
      languageTitle: 'Arayüz Dili',
      languageDesc: 'Menüler, namaz vakitleri, spor merkezi ve ayarlar için anında uygulanır; Arapça için RTL desteklidir.',
      adFreeRulesTitle: 'Reklam Engelleme Kuralları',
      blockedBadge: 'engellendi',
      enabled: 'Etkin',
      disabled: 'Devre Dışı',
      ruleNetflixLabel: 'Netflix Tanıtım Afişlerini ve Fragmanları Kaldır',
      ruleNetflixDesc: 'Netflix sponsorlu afişlerinin ve otomatik fragmanların ana ekranda görünmesini engeller.',
      rulePrimeLabel: 'Prime Video Mağaza ve Reklam Satırlarını Kaldır',
      rulePrimeDesc: 'Prime Video kiralama/satın alma tanıtımlarını gizler ve doğrudan kütüphanenizi açar.',
      ruleHomeRecLabel: 'Android TV Sponsorlu Önerilerini Engelle',
      ruleHomeRecDesc: 'Play Filmler kiralama satırlarını ve sponsorlu uygulama kutularını gizler.',
      ruleTelemetryLabel: 'Başlatıcı Telemetrisini ve İzleme Sinyallerini Kes',
      ruleTelemetryDesc: 'Uygulama başlatma geçmişini cihazda tutar.',
      geoRegionTitle: 'Bölge Kısıtlama Politikası',
      geoRegionDesc: 'TV uygulamaları ve canlı kanallar için bölgesel yayın haklarını uygular.',
      interceptedTitle: 'Engellenen Tanıtım Satırları',
      noBlockedRows: 'Şu anda engellenen tanıtım akışı yok.',
      blockedTag: 'Engellendi',
      installedAppsTitle: 'Yüklü TV Uygulamaları',
      lockedTag: 'Kilitli',
    },
    adhanOverlay: {
      adhanToneOn: 'Ezan Sesi Açık',
      muted: 'Sessiz',
      callToPrayer: 'Ezan Vakti',
      supplicationsHeader: 'Ezan Sonrası Dualar',
      previousDua: 'Önceki Dua',
      nextDua: 'Sonraki Dua',
      tabAdhan: 'Ezan Çağrısı',
      tabSupplications: 'Ezan Sonrası Dualar',
    },
    appModal: {
      geoPolicy: 'Bölge Kısıtlama Politikası',
      permitted: 'İzinli',
      blockedIn: 'Engelli bölge:',
      adStripping: 'Reklam Temizleme',
      activeZeroBanners: 'Etkin (Sıfır Reklam)',
      leanbackIntent: 'Android TV Leanback Komutu',
      launchedNote: 'Reklamsız başlatma komutu gönderildi:',
      launchAdFree: 'Reklamsız Başlat',
      launched: 'Başlatıldı',
    },
    weather: {
      title: 'Yerel Hava Durumu',
      feelsLike: 'Hissedilen',
      humidity: 'Nem',
      wind: 'Rüzgar',
      liveSource: 'Canlı hava durumu',
      estimatedSource: 'Bölgesel iklim tahmini',
      forecast3Day: '3 Günlük Tahmin',
      conditions: {
        clear: 'Açık Hava',
        partlyCloudy: 'Parçalı Bulutlu',
        cloudy: 'Çok Bulutlu',
        fog: 'Sisli',
        drizzle: 'Hafif Çisenti',
        rain: 'Yağmurlu',
        snow: 'Karlı',
        storm: 'Fırtına',
      },
    },
  },
};

export function getLanguageOption(code: LanguageCode): LanguageOption {
  return SUPPORTED_LANGUAGES.find((l) => l.code === code) ?? SUPPORTED_LANGUAGES[0];
}

export function getTranslations(code: LanguageCode): Translations {
  return TRANSLATIONS[code] ?? TRANSLATIONS.en;
}
