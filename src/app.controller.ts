import { Controller, Get, Logger, UseGuards } from "@nestjs/common";
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';
import { UseLanguageInterceptor } from './intercepter/language-intercepter';
import { I18n, I18nContext, I18nService } from "nestjs-i18n";

@Controller()
export class AppController {
  constructor(private readonly i18n: I18nService) {}
  private logger = new Logger('AppController');
  @Get('aaa')
  @UseLanguageInterceptor()
  aaa() {
    return 'aaa';
  }

  @Get('bbb')
  bbb() {
    return 'bbb';
  }

  @Get()
  @Get()
  async getHello(@I18n() i18n: I18nContext) {

    return i18n.t('test.hello');
  }
}
