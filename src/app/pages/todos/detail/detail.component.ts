import { Component, computed, inject, input } from '@angular/core';
import { JSONPlaceholderService } from '../../../services/jsonplaceholder.service';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [JsonPipe, AsyncPipe],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  #jsonplaceholderService = inject(JSONPlaceholderService);
  id = input.required<number | null>();
  post = computed(() => {
    const id = this.id();
    if (!id) return;

    return this.#jsonplaceholderService.getPostById(id);
  });
}
