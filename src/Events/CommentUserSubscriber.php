<?php

namespace App\Events;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use App\Entity\Comment;
use Symfony\Component\Security\Core\Security;

class CommentUserSubscriber implements EventSubscriberInterface
{

    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setUserForComment', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForComment(ViewEvent $event)
    {
        $comment = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($comment instanceof Comment && $method === "POST") {
            // Choper l'utilisateur actuellement connecté
            $user = $this->security->getUser();
            // Assigner l'utilisateur au Customer qu'on est en train de créer
            if ($user) {
                $comment->setUser($user)
                        ->setCreatedAt(new \DateTime())
                ;
            }
        }
    }
}
