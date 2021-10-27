const sidebarOptions = [
  { label: 'Home', routeName: 'Home', iconClass: 'fa-home' },
  { label: 'Animais', routeName: 'Animals', iconClass: 'fa-dog' },
  { label: 'Adoções', routeName: 'Adoptions', iconClass: 'fa-paw' },
  {
    label: 'Voluntários',
    routeName: 'Volunteers',
    iconClass: 'fa-people-carry',
  },
  { label: 'Medicamentos', routeName: 'Medicines', iconClass: 'fa-capsules' },
  {
    label: 'Casos de ajuda',
    routeName: 'HelpCases',
    iconClass: 'fa-life-ring',
  },
  {
    label: 'Serviços',
    routeName: 'Services',
    iconClass: 'fa-hand-holding-heart',
  },
  {
    label: 'Clínicas parceiras',
    routeName: 'PartnerClinics',
    iconClass: 'fa-clinic-medical',
  },
  {
    label: 'Transações',
    routeName: 'Transactions',
    iconClass: 'fa-money-check-alt',
  },
  { label: 'Produtos', routeName: 'Products', iconClass: 'fa-box-open' },
] as const;

export default sidebarOptions;
