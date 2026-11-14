/**
 * The iBroka icon set: Phosphor, filled weight, re-exported under stable names.
 * Components and screens import icons from here only (UI rule 38), never from another set.
 * Glyphs that are pure lines and have no filled form (plus, close, check, minus) use the bold weight
 * so they sit at the same visual weight as the filled icons.
 */
import type { Icon, IconProps } from '@phosphor-icons/react';
import {
  Airplane,
  ArrowDown,
  ArrowRight,
  ArrowsDownUp,
  ArrowUp,
  Bank,
  Bell,
  Boat,
  Briefcase,
  Buildings,
  Calculator,
  CalendarBlank,
  Car,
  CaretDown,
  CaretLeft,
  CaretRight,
  CaretUp,
  ChartBar,
  ChartLine,
  ChartPieSlice,
  Check,
  CheckCircle,
  ClipboardText,
  Cloud,
  CloudArrowUp,
  Coins,
  Columns,
  DotsThree,
  DownloadSimple,
  Envelope,
  Export,
  Eye,
  FacebookLogo,
  File,
  FileArrowUp,
  FilePdf,
  FileText,
  Fire,
  Funnel,
  GearSix,
  Gift,
  HandCoins,
  Handshake,
  Headset,
  Heartbeat,
  IdentificationCard,
  Info,
  InstagramLogo,
  Lightning,
  Link,
  ListBullets,
  ListNumbers,
  MagnifyingGlass,
  MapPin,
  Minus,
  Money,
  Moon,
  Palette,
  Paperclip,
  PaperPlaneTilt,
  PencilSimple,
  Phone,
  Plant,
  Plus,
  Quotes,
  Receipt,
  Scales,
  ShieldCheck,
  ShieldChevron,
  SidebarSimple,
  SignOut,
  SquaresFour,
  Stamp,
  Star,
  Sun,
  Target,
  TextB,
  TextItalic,
  Trash,
  Tray,
  TrendDown,
  TrendUp,
  Truck,
  UploadSimple,
  User,
  UserGear,
  Users,
  UsersFour,
  UsersThree,
  Wallet,
  Warning,
  WarningCircle,
  X,
  XCircle,
  XLogo,
} from '@phosphor-icons/react';

const filled = (I: Icon) => {
  const C = (p: IconProps) => <I weight="fill" size="100%" aria-hidden {...p} />;
  C.displayName = `${I.displayName ?? 'Icon'}Fill`;
  return C;
};
const bold = (I: Icon) => {
  const C = (p: IconProps) => <I weight="bold" size="100%" aria-hidden {...p} />;
  C.displayName = `${I.displayName ?? 'Icon'}Bold`;
  return C;
};

// Navigation (sidebar modules)
export const DashboardIcon = filled(SquaresFour);
export const HumanResourcesIcon = filled(UsersFour);
export const InsuranceIcon = filled(ShieldChevron);
export const AccountingIcon = filled(Calculator);
export const AccountBrokerIcon = filled(Briefcase);
export const ReportsIcon = filled(ChartLine);
export const AdministrationIcon = filled(UserGear);
export const SettingsIcon = filled(GearSix);
export const CollapseSidebarIcon = filled(SidebarSimple);

// Chrome
export const BellIcon = filled(Bell);
export const MoonIcon = filled(Moon);
export const SunIcon = filled(Sun);
export const SearchIcon = bold(MagnifyingGlass);
export const SignOutIcon = filled(SignOut);

// Carets and glyphs
// Chevrons are line glyphs (Phosphor's filled caret is a triangle), so they use bold like plus and close.
export const CaretDownIcon = bold(CaretDown);
export const CaretUpIcon = bold(CaretUp);
export const CaretLeftIcon = bold(CaretLeft);
export const CaretRightIcon = bold(CaretRight);
export const MoreIcon = bold(DotsThree);
export const PlusIcon = bold(Plus);
export const CloseIcon = bold(X);
export const CheckIcon = bold(Check);
export const MinusIcon = bold(Minus);
export const SortIcon = filled(ArrowsDownUp);
export const ArrowUpIcon = bold(ArrowUp);
export const ArrowDownIcon = bold(ArrowDown);

// Actions
export const ExportIcon = filled(FileArrowUp);
export const ShareIcon = filled(Export);
export const DownloadIcon = filled(DownloadSimple);
export const UploadIcon = filled(UploadSimple);
export const CloudUploadIcon = filled(CloudArrowUp);
export const FilterIcon = filled(Funnel);
export const ListViewIcon = filled(ListBullets);
export const GridViewIcon = filled(SquaresFour);
export const ColumnsIcon = filled(Columns);
export const DeleteIcon = filled(Trash);
export const EditIcon = filled(PencilSimple);
export const ViewIcon = filled(Eye);
export const CalendarIcon = filled(CalendarBlank);
export const AttachIcon = filled(Paperclip);
export const LinkIcon = filled(Link);
export const BoldIcon = bold(TextB);
export const ItalicIcon = bold(TextItalic);
export const BulletListIcon = bold(ListBullets);
export const NumberListIcon = bold(ListNumbers);

// Feedback
export const SuccessIcon = filled(CheckCircle);
export const ErrorIcon = filled(XCircle);
export const WarningIcon = filled(Warning);
export const AlertIcon = filled(WarningCircle);
export const InfoIcon = filled(Info);
export const EmptyIcon = filled(Tray);

// Files
export const FileIcon = filled(File);
export const PdfIcon = filled(FilePdf);
export const DocumentIcon = filled(FileText);

// Business
export const MoneyIcon = filled(Money);
export const IncomeIcon = filled(HandCoins);
export const ExpenseIcon = filled(Wallet);
export const PremiumIcon = filled(TrendUp);
export const TrendUpIcon = filled(TrendUp);
export const TrendDownIcon = filled(TrendDown);
export const UserIcon = filled(User);
export const UsersIcon = filled(Users);
export const CustomersIcon = filled(UsersThree);
export const LeadsIcon = filled(Target);
export const TransactionIcon = filled(Receipt);
export const ReportIcon = filled(ChartPieSlice);
export const BarChartIcon = filled(ChartBar);
export const InsurerIcon = filled(Buildings);
export const BankIcon = filled(Bank);
export const ApprovalIcon = filled(Stamp);
export const ClaimIcon = filled(ClipboardText);
export const KycIcon = filled(IdentificationCard);
export const BalanceIcon = filled(Scales);
export const BrokerIcon = filled(Handshake);

// Insurance classes
export const MotorIcon = filled(Car);
export const HealthIcon = filled(Heartbeat);
export const AgricIcon = filled(Plant);
export const AviationIcon = filled(Airplane);
export const FireIcon = filled(Fire);

// Marketing site (landing page)
export const ArrowRightIcon = bold(ArrowRight);
export const CloudIcon = filled(Cloud);
export const SupportIcon = filled(Headset);
export const CoinsIcon = filled(Coins);
export const BrandingIcon = filled(Palette);
export const GiftIcon = filled(Gift);
export const QuoteIcon = filled(Quotes);
export const StarIcon = filled(Star);
export const LocationIcon = filled(MapPin);
export const MailIcon = filled(Envelope);
export const PhoneIcon = filled(Phone);
export const FacebookIcon = filled(FacebookLogo);
export const XSocialIcon = filled(XLogo);
export const InstagramIcon = filled(InstagramLogo);
export const RemittanceIcon = filled(PaperPlaneTilt);
export const ProtectedIcon = filled(ShieldCheck);
export const FastIcon = filled(Lightning);
export const MarineIcon = filled(Boat);
export const TransitIcon = filled(Truck);
