import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { SidebarModule } from 'primeng/sidebar';
import { DetailComponent } from './detail/detail.component';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [RouterLink, SidebarModule, DetailComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit, OnDestroy {
  #router = inject(Router);
  #activatedRoute = inject(ActivatedRoute);
  #onUrlChangeSubscription: Subscription;
  sidebarVisible = signal<boolean>(false);
  id = signal<number | null>(null);

  constructor() {
    // URLの変更を検知
    this.#onUrlChangeSubscription = this.#router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => this.onUrlChange(event));
  }

  ngOnInit(): void {
    console.log('TodosComponent#ngOnInit');
  }

  ngOnDestroy(): void {
    console.log('TodosComponent#ngOnDestroy');
    this.#onUrlChangeSubscription.unsubscribe();
  }

  /**
   * URL変更をトリガーに発火するイベント
   * @param event イベント
   */
  onUrlChange(event: any) {
    console.log('TodosComponent#onUrlChange', event);
    const id = Number.parseInt(this.#activatedRoute.firstChild?.snapshot.params['id'], 10);
    if (!Number.isNaN(id) && id) {
      this.id.set(id);
      this.sidebarVisible.set(true);
    } else {
      this.id.set(null);
      this.sidebarVisible.set(false);
    }
  }

  /**
   * サイドペイン閉じた際のハンドリング
   * /todos へ遷移するようにする
   */
  onHide() {
    this.#router.navigate(['/todos']);
  }
}
