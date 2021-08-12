import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './alert/alert.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { TitleComponent } from './title/title.component';
import { ItemCourseComponent } from './item-course/item-course.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListRisksComponent } from './list-risks/list-risks.component';
import { ChatComponent } from './chat/chat.component';
import { DetailRisksComponent } from './detail-risks/detail-risks.component';
import { InfoAcademyComponent } from './info-academy/info-academy.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ActivitiesListComponent } from './activities-list/activities-list.component';
import { MeetingComponent } from './meeting/meeting.component';
import { RecordComponent } from './record/record.component';
import { FloatingButtonComponent } from './floating-button/floating-button.component';
import { WellnessNotificationComponent } from './wellness-notification/wellness-notification.component';
import { NotificationDateComponent } from './notification-date/notification-date.component';
import { SearchStudentComponent } from './search-student/search-student.component';
import { TableComponent } from './table/table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatisticsRiskComponent } from './statistics-risk/statistics-risk.component';
import { TableRiskComponent } from './table-risk/table-risk.component';
import { ButtonFollowComponent } from './button-follow/button-follow.component';
import { ModalDescriptionComponent } from './modal-description/modal-description.component';
import { ModalPostulateComponent } from './modal-postulate/modal-postulate.component';
import { BinnacleComponent } from './binnacle/binnacle.component';
import { ItemCourseAssistanceComponent } from './item-course-assistance/item-course-assistance.component';
import { LoadingComponent } from './loading/loading.component';
import { ValidatePostulationComponent } from './validate-postulation/validate-postulation.component';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { FilterStudentPipe } from '../pipes/filter-student.pipe';
import { AcademyListCourseComponent } from './academy-list-course/academy-list-course.component';
import { NoteIndexComponent } from './note-index/note-index.component';
import { ButtonNotificationComponent } from './button-notification/button-notification.component';
import { ModalMeetComponent } from './modal-meet/modal-meet.component';
import { DownloadPdfComponent } from './download-pdf/download-pdf.component';
import { SearchGlobalComponent } from './search-global/search-global.component';

@NgModule({
  declarations: [
    AlertComponent,
    ProfileCardComponent,
    TitleComponent,
    ItemCourseComponent,
    NavbarComponent,
    ListRisksComponent,
    ChatComponent,
    DetailRisksComponent,
    InfoAcademyComponent,
    UpdateProfileComponent,
    RecordComponent,
    FloatingButtonComponent,
    MeetingComponent,
    ActivitiesListComponent,
    WellnessNotificationComponent,
    NotificationDateComponent,
    SearchStudentComponent,
    TableComponent,
    StatisticsRiskComponent,
    TableRiskComponent,
    ButtonFollowComponent,
    ModalDescriptionComponent,
    ModalPostulateComponent,
    BinnacleComponent,
    ItemCourseAssistanceComponent,
    LoadingComponent,
    ValidatePostulationComponent,
    OrderByPipe,
    FilterStudentPipe,
    AcademyListCourseComponent,
    NoteIndexComponent,
    ButtonNotificationComponent,
    ModalMeetComponent,
    DownloadPdfComponent,
    SearchGlobalComponent,
  ],
  exports: [
    AlertComponent,
    ProfileCardComponent,
    TitleComponent,
    ItemCourseComponent,
    NavbarComponent,
    FloatingButtonComponent,
    DetailRisksComponent,
    ActivitiesListComponent,
    MeetingComponent,
    SearchStudentComponent,
    TableComponent,
    StatisticsRiskComponent,
    TableRiskComponent,
    ButtonFollowComponent,
    BinnacleComponent,
    ItemCourseAssistanceComponent,
    LoadingComponent,
    ValidatePostulationComponent,
    OrderByPipe,
    FilterStudentPipe,
    NoteIndexComponent,
    ButtonNotificationComponent,
    ModalMeetComponent,
    DownloadPdfComponent,
    SearchGlobalComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
})
export class ComponentsModule {}
