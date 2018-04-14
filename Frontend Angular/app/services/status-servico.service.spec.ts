import { TestBed, inject } from '@angular/core/testing';

import { StatusServicoService } from './status-servico.service';

describe('StatusServicoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatusServicoService]
    });
  });

  it('should be created', inject([StatusServicoService], (service: StatusServicoService) => {
    expect(service).toBeTruthy();
  }));
});
