const COUPLE = 'Nabanita & Nishant';
const DATES = '4–5 December 2026';
const CONTACT = 'Koyel';
const MAX_GUESTS = 6;
const CELEBRATIONS = [
  'Friday morning · Mehendi ceremony',
  'Friday evening · Haldi ceremony',
  'Saturday morning · Ring exchange, court marriage & lunch',
  'Saturday night · Bengali wedding & dinner',
];

function createWeddingRsvpForm() {
  const form = FormApp.create(`RSVP · ${COUPLE} · ${DATES}`);
  form
    .setDescription('We would love to celebrate with you! One reply per household is perfect.')
    .setConfirmationMessage(
      `Thank you! We have received your RSVP and can't wait to celebrate with you. If your plans change, please let ${CONTACT} know as early as you can.`,
    )
    .setProgressBar(true)
    .setAllowResponseEdits(true);

  form.addTextItem().setTitle('Household or family name').setHelpText('For example: The Das family').setRequired(true);
  form.addTextItem().setTitle('Your name').setRequired(true);
  form.addTextItem().setTitle('Phone or WhatsApp number (optional)');
  form
    .addTextItem()
    .setTitle('Email address (optional)')
    .setValidation(FormApp.createTextValidation().requireTextIsEmail().build());
  const attending = form.addMultipleChoiceItem().setTitle('Will your household be joining us?').setRequired(true);

  const celebrationsPage = form.addPageBreakItem().setTitle('Celebrations');
  form
    .addCheckboxItem()
    .setTitle('Which celebrations will your household join?')
    .setChoiceValues(CELEBRATIONS)
    .setRequired(true);

  const guestPages = [];
  const moreGuestQuestions = [];
  for (let guest = 1; guest <= MAX_GUESTS; guest += 1) {
    guestPages.push(
      form
        .addPageBreakItem()
        .setTitle(`Guest ${guest}`)
        .setHelpText(guest === 1 ? 'Start with yourself if you are coming.' : ''),
    );
    form.addTextItem().setTitle(`Guest ${guest}: full name`).setRequired(true);
    form
      .addMultipleChoiceItem()
      .setTitle(`Guest ${guest}: meal preference`)
      .setChoiceValues(['Vegetarian', 'Non-vegetarian'])
      .setRequired(true);
    form
      .addMultipleChoiceItem()
      .setTitle(`Guest ${guest}: nut allergy?`)
      .setChoiceValues(['No', 'Yes'])
      .setRequired(true);
    form
      .addParagraphTextItem()
      .setTitle(`Guest ${guest}: other allergies, intolerances, or ingredients to avoid`)
      .setHelpText('Please include details of any nut allergy. Leave blank if none.');
    if (guest < MAX_GUESTS) {
      moreGuestQuestions.push(
        form.addMultipleChoiceItem().setTitle('Is anyone else from your household coming?').setRequired(true),
      );
    }
  }

  const finalPage = form.addPageBreakItem().setTitle('Anything else?');
  form
    .addParagraphTextItem()
    .setTitle("Anything else you'd like us to know?")
    .setHelpText('Accessibility needs, a note for the couple, or anything else.');

  attending.setChoices([
    attending.createChoice("Yes, we'll be there", celebrationsPage),
    attending.createChoice("Sorry, we can't make it", finalPage),
  ]);
  moreGuestQuestions.forEach((question, index) => {
    question.setChoices([
      question.createChoice('Yes, add another guest', guestPages[index + 1]),
      question.createChoice("No, that's everyone", finalPage),
    ]);
  });

  if (typeof form.setPublished === 'function') form.setPublished(true);

  const responses = SpreadsheetApp.create(`RSVP responses · ${COUPLE}`);
  form.setDestination(FormApp.DestinationType.SPREADSHEET, responses.getId());

  Logger.log(`Form link for the website: ${form.getPublishedUrl()}`);
  Logger.log(`Edit the form: ${form.getEditUrl()}`);
  Logger.log(`Responses spreadsheet: ${responses.getUrl()}`);
}
