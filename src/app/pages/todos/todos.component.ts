import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { SidebarModule } from 'primeng/sidebar';
import { DetailComponent } from './detail/detail.component';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [RouterLink, SidebarModule, DetailComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  sidebarVisible = signal<boolean>(false);
  id = signal<number | null>(null);

  constructor() {
    // URLの変更を検知
    this.router.events
      .pipe(takeUntilDestroyed())
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => this.onUrlChange(event));
  }

  /**
   * URL変更をトリガーに発火するイベント
   * @param event イベント
   */
  onUrlChange(event: any) {
    console.log('TodosComponent#onUrlChange', event);
    const id = Number.parseInt(this.activatedRoute.firstChild?.snapshot.params['id'], 10);
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
    this.router.navigate(
      ['./'],
      { relativeTo: this.activatedRoute },
    );
  }
}
