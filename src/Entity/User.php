<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ApiResource(
 *    itemOperations={
 *      "GET" = {
 *          "security"="is_granted('ROLE_ADMIN') or (
             is_granted('ROLE_USER') and object === user)",
            "security_message"="Vous ne pouvez pas voir le compte 
             de quelqu'un d'autre que vous ne possédez pas !."
 *         },
 *       
 *         
 *      "DELETE" = {
 *         "security"="is_granted('ROLE_ADMIN') or (
            is_granted('ROLE_USER') and object === user)",
           "security_message"="Vous ne pouvez pas supprimer le compte 
            de quelqu'un d'autre que vous ne possédez pas !."
 *         },
 *         
 *      "PUT" = {
 *         "security"="is_granted('ROLE_ADMIN') or (
            is_granted('ROLE_USER') and object === user)",
           "security_message"="Vous ne pouvez pas modifier le compte 
            de quelqu'un d'autre que vous ne possédez pas !."
 *         },
 *    },
 *    collectionOperations={
 *      "GET"={
 *         "security"="is_granted('ROLE_ADMIN')",
 *         "security_message"="juste les admins peuvent avoir les utilisateurs !."
 *      },
 *      "POST"={
 *       
 *      },
 *     },
 *    normalizationContext={"groups"={"user:read"}},
 *    denormalizationContext={"groups"={"user:write"}}
 * )
 * @UniqueEntity("email", message="Désolé, cet email déja exist !")
 * @UniqueEntity("username", message="Désolé, cet username déja exist !")
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"user:write", "user:read", "comment:read", "comment-write", "product-comment:read", "order:read","like:read", "order:write", "product-read", "products:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"user:write", "user:read"})
     * @Groups({"comment:read", "order:write", "order:read", "product-comment:read", "order:read"})
     * @Assert\NotBlank(message="username ne peut pas être vide !")
     * @Assert\NotNull(message="username ne peut pas être null !")
     * @Assert\Length(min=3, minMessage="le nombre de caractère de ce champ doit être superieur à 3!")
     */
    private $username;

    /**
     * @ORM\Column(type="json")
     * @Groups({"user:read"})
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Groups({"user:write"})
     * @Assert\NotBlank(message="password ne peut pas être vide !") 
     * @Assert\NotNull(message="password ne peut pas être null !") 
     * @Assert\Length(min=6, minMessage="le nombre de caractère de ce champ doit  être superieur à 6!")
     */
    private $password;
    /**
     * @Groups({"user:write"})
     * @Assert\EqualTo(propertyPath="password", message="les password sont différentes !")
     * @Assert\NotNull(message="confirmer votre mot de passe")
     * @Assert\NotBlank(message="confirmer votre mot de passe")
     */
    public $passwordConfirm;

    /**
     * @ORM\OneToMany(targetEntity=Comment::class, mappedBy="user")
     */
    private $comments;

    /**
     * @ORM\OneToMany(targetEntity=Cart::class, mappedBy="user", orphanRemoval=true)
     */
    private $carts;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user:write", "user:read", "order:read"})
     * @Assert\NotBlank(message="email ne peut pas être vide !")
     * @Assert\Email(message="l'email n'est pas valid !")
     */
    private $email;
    

    /**
     * @ORM\OneToMany(targetEntity=Like::class, mappedBy="user", orphanRemoval=true)
     */
    private $likes;

    /**
     * @ORM\OneToMany(targetEntity=Order::class, mappedBy="user")
     */
    private $orders;

    /**
     * @ORM\OneToMany(targetEntity=CancledOrder::class, mappedBy="user")
     */
    private $cancledOrders;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * * @Groups({"user:write", "user:read"})
     */
    private $activationCode;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * * @Groups({"user:write", "user:read"})
     */
    private $resetPasswordCode;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $createdAt;
    



    public function __construct()
    {
        $this->comments = new ArrayCollection();
        $this->carts = new ArrayCollection();
        $this->likes = new ArrayCollection();
        $this->orders = new ArrayCollection();
        $this->cancledOrders = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @return Collection|Comment[]
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments[] = $comment;
            $comment->setUser($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->contains($comment)) {
            $this->comments->removeElement($comment);
            // set the owning side to null (unless already changed)
            if ($comment->getUser() === $this) {
                $comment->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Cart[]
     */
    public function getCarts(): Collection
    {
        return $this->carts;
    }

    public function addCart(Cart $cart): self
    {
        if (!$this->carts->contains($cart)) {
            $this->carts[] = $cart;
            $cart->setUser($this);
        }

        return $this;
    }

    public function removeCart(Cart $cart): self
    {
        if ($this->carts->contains($cart)) {
            $this->carts->removeElement($cart);
            // set the owning side to null (unless already changed)
            if ($cart->getUser() === $this) {
                $cart->setUser(null);
            }
        }

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * @return Collection|Like[]
     */
    public function getLikes(): Collection
    {
        return $this->likes;
    }

    public function addLike(Like $like): self
    {
        if (!$this->likes->contains($like)) {
            $this->likes[] = $like;
            $like->setUser($this);
        }

        return $this;
    }

    public function removeLike(Like $like): self
    {
        if ($this->likes->contains($like)) {
            $this->likes->removeElement($like);
            // set the owning side to null (unless already changed)
            if ($like->getUser() === $this) {
                $like->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Order[]
     */
    public function getOrders(): Collection
    {
        return $this->orders;
    }

    public function addOrder(Order $order): self
    {
        if (!$this->orders->contains($order)) {
            $this->orders[] = $order;
            $order->setUser($this);
        }

        return $this;
    }

    public function removeOrder(Order $order): self
    {
        if ($this->orders->contains($order)) {
            $this->orders->removeElement($order);
            // set the owning side to null (unless already changed)
            if ($order->getUser() === $this) {
                $order->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|CancledOrder[]
     */
    public function getCancledOrders(): Collection
    {
        return $this->cancledOrders;
    }

    public function addCancledOrder(CancledOrder $cancledOrder): self
    {
        if (!$this->cancledOrders->contains($cancledOrder)) {
            $this->cancledOrders[] = $cancledOrder;
            $cancledOrder->addUser($this);
        }

        return $this;
    }

    public function removeCancledOrder(CancledOrder $cancledOrder): self
    {
        if ($this->cancledOrders->contains($cancledOrder)) {
            $this->cancledOrders->removeElement($cancledOrder);
            $cancledOrder->removeUser($this);
        }

        return $this;
    }

    public function getActivationCode(): ?int
    {
        return $this->activationCode;
    }

    public function setActivationCode(?int $activationCode): self
    {
        $this->activationCode = $activationCode;

        return $this;
    }

    public function getResetPasswordCode(): ?string
    {
        return $this->resetPasswordCode;
    }

    public function setResetPasswordCode(?string $resetPasswordCode): self
    {
        $this->resetPasswordCode = $resetPasswordCode;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(?\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}
